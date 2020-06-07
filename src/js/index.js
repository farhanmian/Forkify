import $ from 'jquery';
import '../css/main.scss';


import * as config from './config';
/*

const APP_key = 'a352c471734b35d8819811103d135d25';
const APP_ID = '3bb85b67';

const exampleReq = "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free";

const modifyExReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_key}`;

https://api.edamam.com/search?q=chicken&app_id=3bb85b67&app_key=a352c471734b35d8819811103d135d25

*/




import Search from './models/Search';
import Recipe from './models/Recipe';
import list from './models/list';
import Likes from './models/Likes';
import * as searchView from './view/SearchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import * as likesView from './view/likesView';
import { elements, renderLoader, clearLoader} from './view/base';
/** Global State of the App
 * - Search Object
 * - Current recipe object
 * - Shopping list object
 * - liked object
 */

const state = {};
window.state = state;

/** 
 * SEARCH CONTROLLER
 */

const controllSerch = async()=> {
  // 1) get the query view
  const query = searchView.getInput(); // todo
  // console.log(query);

  if(query) {
    // 2) new search object and add to state
    state.search = new Search(query);

    // 3) prepare UI for result
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    
    try {
      // 4) search for recipes
      await state.search.getResults();
      console.log(state.search);
      // 5) Render result on UI
      
      clearLoader();
      searchView.renderResults(state.search.result)
    
    } catch (error) {
      alert('something went wrong with search!!');
      clearLoader();
    }

  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controllSerch();
});



elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if(btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
    
  }
});


/** 
 * RECIPE CONTROLLER
 */



// const r = new Recipe(`Pizza%20Frizza`);
// r.getRecipe();
// console.log(r);

const controllRecipe = async () => {
  // get the id from url
  const id = window.location.hash.replace('#', '');
  // console.log(id);

  if(id) {
    // prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // highlight selected search item
    // if(state.search)  searchView.highlightSelected(id);

    // create a new recipe object
    state.recipe = new Recipe(id);
    // console.log(state.recipe);

    
    try {
      // get the recipe data and parse ingerdient
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // call calc time and Servings
      state.recipe.calcServings();
      state.recipe.calcTime();

      // render the recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(state.recipe.label) );
      
    } catch (error) {
      alert(error);
      console.log(error);
    }
    
  }

}

// window.addEventListener('hashchange', controllRecipe);
// window.addEventListener('load', controllRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controllRecipe));


/** 
 * List ControllER
 */

const controlList = () => {
  // create a new list if there is no yet
  if(!state.list) state.list = new list();


  // add each ingredient to the list and UI
  state.recipe.ingredientLines.forEach(el => {
    if(el.count === undefined) el.count = 1;
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
    // console.log(item);
  });

}



// Handling delete and update list item event

elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  if(e.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);

    listView.deleteItem(id);
    console.log('here also work')
  }
});




/** 
 * Like ControllER
 */


const controlLike = () => {

  if(!state.likes) state.likes = new Likes();
  const currentID = state.recipe.label;  /// Mybe in place of "id" we hava to write "label"
  
  // User has Not yet liked current recipe
  if(!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.likes.addLikes(
      currentID,
      state.recipe.source,
      state.recipe.url,
      state.recipe.image
    );

    // Toggle the like btn
    likesView.toggleLikeBtn(true);
    
    
    // Add like to UI list 
    likesView.renderLike(newLike);
    console.log(state.likes);

    // User HAS yet liked current recipe
  } else {

    // remove like to the state
    state.likes.deleteLike(currentID);

    // Toggle the like btn
    likesView.toggleLikeBtn(false);


    // remove like to UI list 
    likesView.deleteLike(currentID);
    console.log(state.likes);
    
  }

  likesView.toggleLikeMenu(state.likes.likes.length);
  
}

// Restore likes recipe on page load
window.addEventListener('load', () => {
  state.likes = new Likes();

  // Restore likes
  state.likes.readStorage();

  // Toggle the menu btn
  likesView.toggleLikeMenu(state.likes.likes.length);

  // Render the existing likes
  state.likes.likes.forEach(like => likesView.renderLike(like));

});



// handling recipe btn click

elements.recipe.addEventListener('click', e => {

  if(e.target.matches('.btn-decrease, .btn-decrease *')) {
    // decrease btn is clicked
    if(state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingIngredient(state.recipe);
    }
  } else if(e.target.matches('.btn-increase, .btn-increase *')) {
    // increase btn is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingIngredient(state.recipe);

  } else if(e.target.matches('.recipe__btn-add, .recipe__btn-add *')) { 
      controlList();
  } else if(e.target.matches('.recipe__love, .recipe__love *')) {
    //Like Controller
    controlLike();
    

  }

  // console.log(state.recipe);

})


