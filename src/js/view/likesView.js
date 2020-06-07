import { elements} from './base';
import { limitRecipeTitle} from './SearchView';

export const toggleLikeBtn = isLiked => {
    
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);


    // icons.svg#icon-heart-outlined

};


export const toggleLikeMenu = (numLiked) => {

    elements.likesMenu.style.visibility = numLiked > 0 ? 'visible' : 'hidden';

}

export const renderLike = like => {
    const markup = `
    
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.image}" alt="${like.label}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${like.id}</h4>
                    <p class="likes__author">${like.source}</p>
                </div>
            </a>
        </li>

    `;
    elements.likes__list.insertAdjacentHTML('beforeend', markup);
}

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
}