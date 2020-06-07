import axios from 'axios';
import {APP_key, APP_ID} from '../config';
// const APP_key = 'a352c471734b35d8819811103d135d25';
// const APP_ID = '3bb85b67';
        

export default class Recipe {
    constructor(label) {
        this.label = label; // id = recipe[id] or recipe[1,or2,or3,or..]
    }


    async getRecipe() {
        try{
            const res = await axios(`https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${this.label}&app_id=${APP_ID}&app_key=${APP_key}`);
            // console.log(res);
            
            // console.log(res);

            for(let i = 0; i < res.data.hits.length; i++) {
                const fullPath = res.data.hits[i].recipe;
                // console.log(test.recipe);
                
               
                this.label = fullPath.label;
                this.source = fullPath.source;
                this.url = fullPath.url;
                this.image = fullPath.image;
                this.ingredientLines = fullPath.ingredientLines;                
                
            }
            
        } catch(error){
            // console.error();
            alert(error)
        }
    }

    calcTime() {
        // assuming that we need 15 min for each 3 ingredient
        const numIng = this.ingredientLines.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    };

    parseIngredients() {
        
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const unitsTest = [...unitsShort, 'kg', 'g']


        let tsp, pound, tbsp, oz, cup, to, large, eggs, undefined;


        const newIngredientLines = this.ingredientLines.map(el => {
            // uniform the units
            let  ingredient= el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            // remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            
            // parse ingredient into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsTest.includes(el2));
            
            let objIng;
            if(unitIndex > -1) {
                // there is an unit
                // Ex. 4 1/2 cups, arrcount is [4 1/2] --> eval("4 1/2") --> 4.5;
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if(arrCount.length === 1) {
                    count = eval(arrIng[1].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

            } else if(parseInt(arrIng[0], 10)) {
                // there is no unit, but the first element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if(unitIndex === -1) {
                // there is no unit and no number in 1st position  
                objIng = {
                    conut: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;

        });
        this.ingredientLines = newIngredientLines
    }



    updateServings(type) {
        // servings
        const newServings = type === 'dec' ? this.servings - 1: this.servings + 1;


        // ingredients
        this.ingredientLines.forEach(ing => {
            ing.count = ing.count * (newServings / this.servings);
        });
        
        
        this.servings = newServings;


    }



}