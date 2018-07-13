import * as searchView from './views/searchview';
import * as recipeView from './views/receipeview';
import * as listView from './views/listview';
import search from './model/search';
import { elements } from './views/base';
import res from './model/receipe';
import receipeCategories from './model/receipelist';
import likes from  './model/likes';
import * as shoppingview from './views/shoppingview';
import * as likesview from './views/likesview';
import list from './model/shopping';
import * as recipeview from './views/receipeview';



const state = {};

export const searchRecipe = async (category='Juices',id='') => {
    try {
        const query = searchView.getUserInput();
        state.search =  query? new search(query) : new search(category);
        searchView.clearInput();
        searchView.clearResults();
        await state.search.getReceipe();
        listView.renderCategories();
        searchView.displayOptionsButtons();
         await state.search.getIngredients(state.search.result);
        searchView.clearResultsContainer();
        listView.conditionalDropDown(state.search.result.length);
        listView.renderCookingTimeDropdown(state.search.result.length);
        searchView.renderRecipes(state.search.result, 1, 10);
        }
    catch(error)
    {
        alert(`search alert ${error}`);
    }
}

const findID = (category) => {
    const cat = receipeCategories().find( el => el.title === category);
    return cat.id;
}


export const receipeList = () => {
    const list = new r
    recipeview.renderRecipes(state.search.result)

}


export const listController = () => {
    if(!state.list) state.list = new list();

    state.receipe.ingredients.forEach(e => {
        const item = state.list.addItem(e.count,e.unit,e.ingredient);
    shoppingview.renderItems(item);
});

}

state.likes = new likes();

export const likesController = () => {
    if(!state.likes) state.likes = new likes();
    const id = state.receipe.id;
    // If NOT Liked ...
    if(!state.likes.isLiked(id)){
        //add to the list
        const item = state.likes.addLikes(id,state.receipe.title,state.receipe.publisher,state.receipe.image_url);
        likesview.updateLikeButton(true);
        likesview.renderFavourites(item);
    }
    else{
        state.likes.removeLikes(id);
        console.log('Like Removed!')
        console.log(state.likes);
        likesview.updateLikeButton(false);
        likesview.removeFavourites(id)
    }
}


const recipeController = async () =>
{
    const id = window.location.hash.replace('#','');
    if(id) {
        try {
            state.receipe = new res(id);
            if(state.search) searchView.searchHighlight(id);
            await state.receipe.getRecipe();

            recipeView.clearReceipe();
            state.receipe.calcPrepTime();
            state.receipe.serveCount();
            state.receipe.parseIngredient();
            //const status = state.likes.isLiked(id);
            searchView.clearResults();
            listView.renderCategories();
            searchView.hideOptionsButtons();
            recipeView.renderRecipe(state.receipe,status);
        }
        catch (error) {
            alert(`Receipe alert${error}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {

    elements.searchButton.addEventListener('submit', e => {
    console.log('doc readystate' , document.readyState === "complete");
    e.preventDefault();
    searchView.clearResultsContainer();
    searchRecipe();
}
);

    elements.resultPages.addEventListener('change', e => {
        searchView.clearResultsContainer();
    listView.clearPageIndexing();
    const userChoice = e.target.value;
    state.search.addPreparationTime(state.search.result,state.search.prepTimes);
    searchView.renderRecipes((state.search.result),1,e.target.value);
    listView.noOfItem(userChoice,state.search.result);
});


    elements.resultPagesRadio.addEventListener('change', e => {
        const val = e.target.value;
    console.log('Event is triggered....!')
    searchView.clearResultsContainer();
    searchView.hideDropDown();
    state.search.filterByCookingTime(state.search.result,val,val+15)
    searchView.renderRecipes((state.search.newResult),1,30)
});



    elements.resultLink.addEventListener('click', e => {
        if(e.target.closest('.results__link__list','.results__link__list *'))
    {
        e.preventDefault();
        searchView.clearResultsContainer();
        listView.clearPageIndexing();
        const categoryID = findID(e.target.name);
        searchView.searchHighlight(categoryID);
        searchRecipe(e.target.name,categoryID);
    }
});


    ['hashchange','load'].forEach(event => window.addEventListener(event, recipeController));


elements.shoppinglist.addEventListener('click',e=> {
const id = document.querySelector('.shopping__item').dataset.itemid;
if(e.target.matches('.btn-tiny--remove, .btn-tiny--remove *'))
{
    state.list.deleteItem(id);
    shoppingview.deleteItem(id);
} else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
}
});

// elements.headerLikes.addEventListener('click', e => {
//    likesview.renderFavourites(state.likes)
// });

// adding event listener for each for the change


window.addEventListener('load', e=> {
    state.likes = new likes();
state.likes.readLocalStorage();
state.likes.likes.forEach(e => likesview.renderFavourites(e));
});



elements.receipeContainer.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease,.btn-decrease *')) {
    if(state.receipe.serveCount > 1) {
        state.receipe.updateServings('dec');
        recipeview.updateUI(state.receipe);
    }
}
else if (e.target.matches('.btn-increase,.btn-increase *'))
{
    state.receipe.updateServings('inc');
    recipeview.updateUI(state.receipe);
}
else if (e.target.matches('.recipe__btn--add ,.recipe__btn--add *'))
{
    listController();
}
else if (e.target.matches('.recipe__love, .recipe__love *'))
{
    console.log('likescontroller');
    likesController();
}

});




});

