
import {getData, url} from './feedback-api.js';
import {createMarkup} from './feedback-markup.js'

getData(url).then(response => {    
    const reviews = response.data;

if(reviews && reviews.length > 0){
 createMarkup(reviews)
}}).catch(error => console.log(error));


