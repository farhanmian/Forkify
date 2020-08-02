import { elements} from './base';

export const getInput = () => elements.searchInput.value; 

export const clearInput = () => {elements.searchInput.value = ''; };

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};



export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length; 
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;

    }
    return title
} 


const renderRecipe = recipe => {
    const markup =  `<li>
                        <a class="results__link" href="#${recipe.recipe.label}">
                            <figure class="results__fig">
                                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${limitRecipeTitle(recipe.recipe.label)}</h4>
                                <p class="results__author">${recipe.recipe.source}</p>
                            </div>
                        </a>
                    </li>`;
    
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};



// type: 'next' or 'prev '
const createButton = (page, type) => `

    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
        
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>

`;

const rednerButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    
    let button;
    if(page === 1 && pages > 1) {
        // only btn to go nxt page
        button = createButton(page, 'next');
    } else if(page < pages) {
        // both btns
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    } else if(page === pages && pages > 1) {
        // only btn to go prev page 
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};

export const renderResults = (recipes, page = 1, resPerPage = 7) => {
    // render result of current page
    
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    
    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination button
    rednerButtons(page, recipes.length, resPerPage);
};

