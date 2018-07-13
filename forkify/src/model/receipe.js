import axios from 'axios';


export default class receipe {

    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            //const apiKey = '9ff39916eeff358ef6c6a80cd795f6ca';
            //const apiKey = '313caee7ae70c44e59d9ce00197c2157';
            //const apiKey = '8e870f5827106449c6c09f55d2755812';
            const apiKey = '815d7cd9989cb7a29e53d56599d769ad';
            //const apiKey ='b18984ee178ea7031d32c1f34f305ba4';
            //const apiKey ='00a0518c95a71e4212712f9b1830f03d';
            const corsProxy = 'https://cors-anywhere.herokuapp.com';
            const res = await axios.get(`${corsProxy}/http://food2fork.com/api/get?key=${apiKey}&rId=${this.id}`);
            this.image_url = res.data.recipe.image_url;
            this.ingredients = res.data.recipe.ingredients;
            this.publisher = res.data.recipe.publisher;
            this.title = res.data.recipe.title;
            this.source_url = res.data.recipe.source_url;
        }
        catch (error) {
            alert(`redipe model${error}`);
        }
    }


    calcPrepTime() {
        // Assume it will take 15 minutes for each 3 ingredients
        const numIng = this.ingredients.length;
        const split = numIng/3;
        this.time = split * 3;
    }

    serveCount() {
        this.serveCount = 4;
    }

    parseIngredient() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort,'kg','g'];

        const newIngredient = this.ingredients .map( el => {

            let ingredient =  el.toLowerCase();
        unitsLong.forEach((unit,i) => {
            ingredient.replace(unit,unitsShort[i]);
    });

        ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

        const arrIng = ingredient.split(' ');

        //findIndex() returns the index of that array element  and does not check the remaining value
        // If element is not found then it will return - 1
        const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
        let objIng;
        if (unitIndex > -1) {
            // There is a unit
            // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
            // Ex. 4 cups, arrCount is [4]
            const arrCount = arrIng.slice(0, unitIndex);

            let count;
            if (arrCount.length === 1) {
                count = eval(arrIng[0].replace('-', '+'));
            } else {
                count = eval(arrIng.slice(0, unitIndex).join('+'));
            }



            objIng = {
                count,
                unit: arrIng[unitIndex],
                ingredient: arrIng.slice(unitIndex + 1).join(' ')
            };

        } else if (parseInt(arrIng[0], 10)) {
            // There is NO unit, but 1st element is number
            objIng = {
                count: parseInt(arrIng[0], 10),
                unit: '',
                ingredient: arrIng.slice(1).join(' ')
            }
        } else if (unitIndex === -1) {
            // There is NO unit and NO number in 1st position
            objIng = {
                count: 1,
                unit: '',
                ingredient: arrIng.slice(1).join(' ')
            }
        }

        return objIng;
    });
        this.ingredients = newIngredient;
    }

    updateServings (type) {
        // Servings
        const newServings = type === 'dec' ? this.serveCount - 1 : this.serveCount + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.serveCount);
    });

        this.serveCount = newServings;
    }
}