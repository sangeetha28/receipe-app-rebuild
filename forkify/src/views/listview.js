import { elements } from './base';
import receipeCategories from '../model/receipelist';

const listMarkUp = (list) =>
{
    const markUp=`<li class="results__link__list" >
                   <a class="results__link results" name=${list.title} href="#${list.id}">
                       <figure class="results__fig">
                          <img src=${list.image} alt="Test">
                     </figure>
                       <div class="results__data">
                          <h4 class="results__name" name=${list.title}>${list.title}</h4>
                     </div>
                  </a>
              </li>`;

    elements.resultResults.insertAdjacentHTML("beforeend",markUp);
};


export const noOfItem = (userOption=10,receipes) => {

    userOption = (userOption > receipes.length)? receipes.length : userOption;

    const resultText = receipes.length <10 ? `Displaying 1 to ${receipes.length}`   :  `Displaying 1 to ${userOption} of ${receipes.length}`

    const markUp = `<span> 
    ${resultText}
      </span>`;

    elements.resultNoOfItems.insertAdjacentHTML("beforeend",markUp);
}


export const renderCategories = () => {
    const listItems = receipeCategories();
    listItems.map(e => listMarkUp(e));
}


export const clearPageIndexing = () => {
    elements.resultNoOfItems.innerHTML='';
}


const renderDropdown = (e) => {
    const displayStatus = (length < 10) ? 'none':'';
    const markUp = `<div class="form-group">
   <h4 class="heading-4"> Receipes per Page </h4>
   <select class="form-control" id="sel1">
   {renderOption}
  </select>
</div>`;
   elements.resultPages.insertAdjacentHTML("beforeend", markUp);
}

const renderOption = (e) => {
    const option = document.createElement("option");
    if( e === 0) {
        option.text = "Default";
        option.value = 20;
    }
    else {
        option.text = e;
        option.value = e;
    }
    document.querySelector('.form-control').add(option);
}


export const conditionalDropDown = (length) => {
    if( length > 0)
        length = Math.ceil(length/5.0) * 5;
    else if( length < 0)
        length = Math.floor(n/5.0) * 5;
    else
        length = 5;

    console.log('length is ... ',length);
    const newList = [];
    for (let i = 5; i <= length; i += 5) {
        const b = i / 5;
        newList.push(b*5);
    }
    if(newList.length > 1) {
        renderDropdown();
        newList.forEach(e => renderOption(e));
    }
}

export const renderCookingTimeDropdown = (length) =>
{
    const markUp=`
    <form class="form-inline" role="form">
    <div class="btn-group" data-toggle="buttons">
    <h4 class="heading-4"> Receipes per Cooking time</h4>
     <label class="radio-inline radio-size">
        <input checked type="radio" name='cook' autocomplete="off" value=""> Default
    </label>
    <label class="radio-inline radio-size">
        <input type="radio" name='cook' autocomplete="off" value="0"> 1 - 15 min
    </label>

    <label class="radio-inline radio-size">
        <input type="radio" name='cook' autocomplete="off" value="15"> 15 - 30 min
    </label>

     <label class="radio-inline radio-size">
        <input type="radio" name='cook' autocomplete="off" value1="30"> 30 - 45 min
    </label>
</div> 
</form>`;
    if (length < 10) {
        elements.resultPagesRadio.style.display='none';
    }
    else {
        elements.resultPagesRadio.insertAdjacentHTML("beforeend", markUp);
    }

};
