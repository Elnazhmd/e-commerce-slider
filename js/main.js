const products = "./data/products.json";
const productList = document.querySelector(".products__list");
const prevBtnEl = document.querySelector("#prev");
const nextBtnEl = document.querySelector("#next");

// Defining async function
async function getapi(url) {
// Storing response
    const response = await fetch(url);
// Storing data in form of JSON
    let data = await response.json();
    console.log(data);
    let test = data.map((item) => {
        printCard(item);
        slider(productList);
    })
}
// my function to make product cards
function printCard(item){
  // calculate the discount
    let discount = Math.floor((((item.oldPrice ? item.oldPrice : item.price) - (item.price)) * 100) / (item.oldPrice ? item.oldPrice : item.price));
    discount = discount <= 0 ? "" : `&nbsp&nbsp&nbsp-${discount}%&nbsp&nbsp&nbsp`;
// check for NEW items to insert NEU lable
    let neu = item.params.isNew;
    neu = (item.params.isNew) ? `&nbsp&nbsp&nbsp Neu &nbsp&nbsp&nbsp` : "";
const card = `
      <div class="card">
          <div class="card__img">
              <img src="${item.image}" alt="">
          </div>
          <span class="card__discount-tag">${discount}</span>
          <span class="card__new-tag">${neu}</span>
          <div class="card__title">
              <h4>${item.name}</h4>
          </div>
          <div class="card__desc">
              <p class="item-category">${item.params.land} | ${item.categories[0]}</p>
              <p class="item-price">
              <span>${item.priceText}</span>
              &nbsp
              <strike style="color: lightgray">${item.oldPriceText ? item.oldPriceText : ""}</strike></p>
              <p class="base-price">${item.params.basePrice}</p>
           </div>
        </div>`;
productList.innerHTML += card;
}

// make slider effect function
function slider(list){

  let scrollAmount = null;
  function scroll() {
    prevBtnEl.disabled = true;
    if (nextBtnEl.disabled) nextBtnEl.disabled = false;
    list.classList.remove("-scroll");
    list.scrollLeft = 0;
    list.clientWidth > 960 ? (scrollAmount = 1160) : (scrollAmount = 290);
  }
scroll();
  nextBtnEl.addEventListener("click", function () {
    list.classList.add("-scroll");
    prevBtnEl.disabled = false;
    list.scrollLeft += scrollAmount;
    if (list.scrollLeft + list.clientWidth * 1.7 > list.scrollWidth) {
      this.disabled = true;
    }
  });
  prevBtnEl.addEventListener("click", function () {
    nextBtnEl.disabled = false;
    list.scrollLeft -= scrollAmount;
    if (list.scrollLeft < list.clientWidth) {
      this.disabled = true;
    }
  });
}
// Calling that async function
getapi(products);




  
