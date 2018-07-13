import { elements } from './base';

// Display the results in the ui
export const renderRecipes = (recipe,page,resPerPage) => {
    console.log('newresult',typeof receipe);
    const start = (page - 1) * resPerPage; // in page 1 start: 0 page 2 start 10 page 3 start 30
    const end = page * resPerPage;
    if (recipe === undefined || recipe.length == 0)
        {
            const markUp = `<h3 class="no_items" > Sorry, No Search Results found ....Please try agin after some time!</h3>`;
            elements.receipeContainer.insertAdjacentHTML("beforeend",markUp);
        }
    else
        {
            recipe.slice(start,end).forEach(e=>renderUI(e));
        }
};

export const getUserInput = () => elements.searchInput.value;



export const clearInput = () => { elements.searchInput.value = ''};
export const clearResults = () => {
    elements.resultResults.innerHTML = '';
    elements.receipeContainer.innerHTML = '';
    elements.resultPages.innerHTML = '' ;
    elements.resultPagesRadio.innerHTML='';
};

export const clearResultsContainer = () => {
    elements.receipeContainer.innerHTML = '';
};

export const hideOptionsButtons = () => {
    elements.resultPagesRadio.style.display = 'none';
    elements.resultPages.style.display = 'none';
    elements.resultNoOfItems.style.display = 'none';
}

export const hideDropDown = () => {
    elements.resultPages.style.display = 'none';
    elements.resultNoOfItems.style.display = 'none';
}

export const displayOptionsButtons = () => {
    elements.resultPagesRadio.style.display = '';
    elements.resultPages.style.display = '';
    elements.resultNoOfItems.style.display = '';
}


const titleLimiter = (title,limit = 17) => {
    const newTitle = [];
    if (title.length >= limit) {
        title.split(' ').reduce((acc,cur)=>{
            if(acc + cur.length <= limit) {
            newTitle.push(cur);
        }
        return acc + cur.length;
    },0)
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

export const searchHighlight = (id) => {
    console.log('searching highlight id is',id);
    const searchList = Array.from(document.querySelectorAll('.results__link'));
     searchList.forEach(e => {
         e.classList.remove('results__link--active');
   });
    const active = document.querySelector(`a[href="#${id}"]`);
    if(active){
        active.classList.add('results__link--active');
    }
};

export const renderLoader = parentElement => {
    const loader = `
       <div class="loader">
       <svg>
         <use href="img/icons.svg#icon-cw"></use>
       </svg>
       </div>
    `;
    parentElement.insertAdjacentHTML("afterbegin",loader);
}


export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if(loader) loader.parentElement.removeChild(loader);
}



const renderUI = (r) => {
    const value = (r.prepTime === undefined) ? 'Loading...' : r.prepTime + 'min';
    const markUp = `<li class="list-group-item col-xs-6"> 
                <a class="results__link results" href="#${r.recipe_id}">
                    <figure class="results__fig">
                        <img src=${r.image_url} alt="Test">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${titleLimiter(r.title)}</h4>
                        <p class="results__author">${r.publisher}</p>
                       <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                    #icons.svg#icon-stopwatch
                    <!--icons.svg#icon-stopwatch-->
                </svg>
                <span class="results__preptime">${value}</span>
            </div>
  
                    </div>
                </a>
            </li>`;
    elements.receipeContainer.insertAdjacentHTML("beforeend",markUp);
};

