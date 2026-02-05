

export function createMarkup(markupList){
const markup = markupList.map((list) =>{
return `<li class="swiper-slide item-feedback">
  <div class="stars-rating-feedback">${list.rating}</div>
<p class="text-feedback">${list.descr}</p>
<p class="text-name-feedback">${list.name}</p>
</li>`
}).join('');

const list = document.getElementById('card-list-feedback');

list.insertAdjacentHTML('beforeend', markup);
}
