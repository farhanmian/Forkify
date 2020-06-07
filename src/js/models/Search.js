// export default 'Imported string';
import axios from 'axios';
import {APP_key, APP_ID} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    
    async getResults() {
    
        // const APP_key = 'a352c471734b35d8819811103d135d25';
        // const APP_ID = '3bb85b67';
        try {
        const res = await axios(`https://api.edamam.com/search?q=${this.query}&app_id=${APP_ID}&app_key=${APP_key}`);
        // const recipe = res.data.hits;
        console.log(res);
        this.result = res.data.hits;
        // console.log(this.result);
        

        } catch (error) {
        alert(error);
        }
        
    }
  
    
}



// getResults('tomato pasta');
