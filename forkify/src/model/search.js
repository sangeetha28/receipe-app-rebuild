import axios from 'axios';

//const apiKey = '9ff39916eeff358ef6c6a80cd795f6ca';
//const apiKey = '313caee7ae70c44e59d9ce00197c2157';
//const apiKey = '8e870f5827106449c6c09f55d2755812';
//const apiKey = '313caee7ae70c44e59d9ce00197c2157';
const apiKey = '815d7cd9989cb7a29e53d56599d769ad';
//const apiKey ='00a0518c95a71e4212712f9b1830f03d';
//const apiKey ='b18984ee178ea7031d32c1f34f305ba4';
const corsProxy = 'https://cors-anywhere.herokuapp.com';

export default class search {

    constructor(query) {
        this.query = query;
        console.log('your query is' + query);
    }


    // Async function which fetches data from the API
    async getReceipe() {
        try {
            const res = await
            axios.get(`${corsProxy}/http://food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
            this.result = res.data.recipes;
        }
        catch (error) {
            console.log(error);
        }
    }

    // Assume it will take 15 minutes for each 3 ingredients
    calcTime(ingList) {
        const split = (ingList.length) / 3;
        return split * 3;
    }


    // async getIngredients(list) {
    //     const ids = list.map(el => el.recipe_id);
    //     const totalListOfTimes = [];
    //     // ids.map(action fetch then push to totalList)
    //
    //     try {
    //         await Promise.all() // takes an array
    //     } catch () {}
    //
    //     return totalListOfTimes;
    //
    //     // try {
    //     //     ids.forEach(async(id)=> {
    //     //         const req = await axios.get(`${corsProxy}/http://food2fork.com/api/get?key=${apiKey}&rId=${id}`);
    //     //     this.prepTimes.push(this.calcTime(req.data.recipe.ingredients));
    //     // } );
    //     //
    //     // }
    //     //
    //     // catch (error) {
    //     //     console.log(error);
    //     // }
    //
    // }

    getIngredients(list) {
        const ids = list.map(el => el.recipe_id);
        this.prepTimes = [];
            try {
                ids.forEach(async(id)=> {
                const req = await axios.get(`${corsProxy}/http://food2fork.com/api/get?key=${apiKey}&rId=${id}`);
                this.prepTimes.push(this.calcTime(req.data.recipe.ingredients));
         } );

            }

        catch (error) {
            console.log(error);
        }

    }

addPreparationTime(list,prepTimes){
   list.forEach((r,index) =>  {
   const min = {prepTime: prepTimes[index]};
    Object.assign(r,min);
});
}

filterByCookingTime(receipeList,startTime,finishTime) {
        const newresultsArray = [];
        const res = receipeList.filter(el => el.prepTime >= startTime && el.prepTime <= finishTime);
        this.newResult = res;
  }
}