import axios from 'axios'

export const url = 'https://sound-wave.b.goit.study/api/feedbacks?limit=10&page=1';

export async function getData(url) {
    try{
 const response = await axios.get(url);
 return response.data;
    }catch(error){
console.log(error)}}
