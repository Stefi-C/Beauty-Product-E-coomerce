 
"use strict";




let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onsroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}


/*------------------------------categories and products---------------------------*/


  

    
  for(let i of products.data){
      
      //create Card
      let card = document.createElement("div");
      //card should have category and should stay hidden initially
  
      card.classList.add("card", i.category, "hide");
     
      //img tag
      let image = document.createElement("img");
      image.setAttribute("class","card-img");
      image.setAttribute("src", i.image);
      card.appendChild(image);
     
      //product name
      let name = document.createElement("h5");
      name.classList.add("product-name");
      name.innerText = i.productName.toUpperCase();
      card.appendChild(name);
      //price
      let price = document.createElement("h6");
      price.classList.add("price");
      price.innerText = i.price +  "€";
      card.appendChild(price);
      //addCart buttons
     let addCart = document.createElement("button");
     addCart.classList.add("btn", "add-btn");
     addCart.setAttribute("data-action", "ADD_TO_CART");
     addCart.innerText = "Add to Cart";
     card.appendChild(addCart);
  
      
  
      const productsPage = document.getElementById("products");
      if(productsPage){
        productsPage.appendChild(card);
      }
      
      
      
      
  }
  
  
  
  //parameter passed from button(parameters same as category)
  function filterProduct(value){
      //button class code
      let buttons = document.querySelectorAll(".button-value");
      buttons.forEach((button) => {
          //check if value equals innertext
          if(value.toUpperCase() == button.innerText.toUpperCase()){
              button.classList.add("active");
          }
          else{
              button.classList.remove("active");
          }
      });
      // select all cards
      let elements = document.querySelectorAll(".card");
      //loop trough all cards
      elements.forEach((element) => {
          //display all cards on 'all products'
          if(value == "all"){
              element.classList.remove("hide");
          }
          else{
              //check if element contains category class
              if(element.classList.contains(value)){
                  //display element based on category
                  element.classList.remove("hide");
              }
              else{
                  //hide others elements
                  element.classList.add("hide");
              }
          }
  
      });
  }
  //Search button click
  const search = document.getElementById("search");
  if(search){
    search.addEventListener("click", () => {
      //initializations
      let searchInput = document.getElementById("search-input").value;
      let elements = document.querySelectorAll(".product-name");
      let cards = document.querySelectorAll(".card");
      //loop through all elements
      elements.forEach((element, index) => {
        //check if text includes the search value
        if (element.innerText.includes(searchInput.toUpperCase())) {
          //display matching card
          cards[index].classList.remove("hide");
        } else {
          //hide others
          cards[index].classList.add("hide");
        }
      });
    });
  //initially display all products
  window.onload = () => {
      filterProduct("all");


      
  };
  }
  
  
  /*------------------Shopping Cart---------------------------------------*/

  let cart = JSON.parse(localStorage.getItem("cart")) !== null || [];
  
  console.log(cart);
  const cartDOM = document.querySelector(".cart-dom")
  const addToCartButtonsDOM = document.querySelectorAll('[data-action ="ADD_TO_CART"]');

  if(cart.length > 0) {
    cart.forEach((cartItem) =>{
        console.log(cartItem);
    })
  }
  
  addToCartButtonsDOM.forEach((addToCartButtonDOM) =>{
    addToCartButtonDOM.addEventListener("click", function(){
        const productDOM = addToCartButtonDOM.parentNode;
        const product = {
            image: productDOM.querySelector(".card-img").getAttribute("src"),
            price: productDOM.querySelector(".price").innerText,
            name: productDOM.querySelector(".product-name").innerText,
            quantity: 1
        };
        const isInCart = 
        cart.filter((cartItem)=>
            cartItem.name === product.name).length > 0;
        if(isInCart === false){
            cartDOM.insertAdjacentHTML("beforeend",
        `
        <div class="cart_item">
          <img class="cart_item_image" src="${product.image}" alt="${product.image}">
          <h3 class="cart_item_name">${product.name}</h3>
          <h3 class="cart_item_price">${product.price}</h3>
          <button class="btn decrease-btn" data-action="DECREASE_ITEM">&minus;</button>
          <h3 class="cart__item__quantity">${product.quantity}</h3>
          <button class="btn icrease-btn" data-action="INCREASE_ITEM">&plus;</button>
          <button class="btn remove-btn" data-action="REMOVE_ITEM">&times;</button>
        
        `
        );

        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        addToCartButtonDOM.innerText = "in Cart";
        addToCartButtonDOM.disabled = true;



        const cartItemsDOM = cartDOM.querySelectorAll(".cart_item");
        cartItemsDOM.forEach((cartItemDOM)=>{
            if(
                cartItemDOM.querySelector('.cart_item_name').innerText === product.name
            ) {
                cartItemDOM.querySelector('.icrease-btn')
            .addEventListener("click", ()=>{
               cart.forEach((cartItem) =>{
                if(cartItem.name === product.name){
                    cartItem.quantity ++ ;
                    cartItemDOM.querySelector('.cart__item__quantity').innerText = cartItem.quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
               })
            });
            cartItemDOM.querySelector('.decrease-btn')
            .addEventListener("click", ()=>{
               cart.forEach((cartItem) =>{
                if(cartItem.name === product.name){
                    if(cartItem.quantity > 1){
                        cartItem.quantity -- ;
                        cartItemDOM.querySelector('.cart__item__quantity').innerText = cartItem.quantity;
                        localStorage.setItem('cart', JSON.stringify(cart));
                    }else{
                        cartItemDOM.remove();
                         cart = cart.filter((cartItem) => cartItem.name !== product.name);
                         addToCartButtonDOM.innerHTML = "Add to Cart";
                         addToCartButtonDOM.disabled = false;
                         localStorage.setItem('cart', JSON.stringify(cart));
                    }
                    
                }
               })
            });
            cartItemDOM.querySelector('.remove-btn')
            .addEventListener("click", ()=>{
               cart.forEach((cartItem) =>{
                if(cartItem.name === product.name){
                    
                        cartItemDOM.remove();
                         cart = cart.filter((cartItem) => cartItem.name !== product.name);
                         addToCartButtonDOM.innerHTML = "Add to Cart";
                         addToCartButtonDOM.disabled = false;
                         localStorage.setItem('cart', JSON.stringify(cart));
                    
                    
                }
               })
            });
            }

             
        });
        
        }
        
        
    });
    
  });
  
/*---------------------------------------------------------


let wishList = [];

function setup() 
{
    let products = document.querySelectorAll(".but");
    for (let i = 0; i < products.length; i++)
    {
        products[i].onclick = function(e) {
            addItem(e);
        }
    }
}

function addItem (e) {
    let productId = e.target.getAttribute("id");
    if(!wishList.find(element => element === productId)){
        let productDiv = document.getElementById("product" + productId);

        let wishDiv = document.querySelector(".wish");
        wishDiv.setAttribute("id", "wish" + productId);
        wishDiv += productDiv;
        let removeBtn = document.createElement("input");
        removeBtn.setAttribute("id", "remove" + productId);
        removeBtn.setAttribute("type", "button");
        removeBtn.setAttribute("value", "Remove");
        // removeBtn.setAttribute("class", "removebut");
        removeBtn.onclick = () => {removeItem(productId);
        wishDiv.appendChild(removeBtn);}

        let aside = document.getElementById("wishlist");
        aside.append(wishDiv);

        wishList.push(productId);
    }
}
console.log(typeof wishDiv);
function removeItem(productId) {
    document.getElementById("wish" + productId).remove();
    wishList = wishList.filter(element => element !== productId)
}

window.addEventListener("load", setup);
*/

