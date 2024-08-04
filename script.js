"use strict";

// Menu toggle
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

// Slide functionality
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

// Categories and products
for (let i of products.data) {
    let card = document.createElement("div");
    card.classList.add("card", i.category, "hide");

    let image = document.createElement("img");
    image.setAttribute("class", "card-img");
    image.setAttribute("src", i.image);
    card.appendChild(image);

    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    card.appendChild(name);

    let price = document.createElement("h6");
    price.classList.add("price");
    price.innerText = i.price + "€";
    card.appendChild(price);

    let addCart = document.createElement("button");
    addCart.classList.add("btn", "add-btn");
    addCart.setAttribute("data-action", "ADD_TO_CART");
    addCart.innerText = "Add to Cart";
    card.appendChild(addCart);

    const productsPage = document.getElementById("products");
    if (productsPage) {
        productsPage.appendChild(card);
    }
}

// Filter products
function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        if (value.toUpperCase() === button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    let elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
        if (value === "all") {
            element.classList.remove("hide");
        } else {
            if (element.classList.contains(value)) {
                element.classList.remove("hide");
            } else {
                element.classList.add("hide");
            }
        }
    });
}

// Search functionality
const search = document.getElementById("search");
if (search) {
    search.addEventListener("click", () => {
        let searchInput = document.getElementById("search-input").value;
        let elements = document.querySelectorAll(".product-name");
        let cards = document.querySelectorAll(".card");
        elements.forEach((element, index) => {
            if (element.innerText.includes(searchInput.toUpperCase())) {
                cards[index].classList.remove("hide");
            } else {
                cards[index].classList.add("hide");
            }
        });
    });

    window.onload = () => {
        filterProduct("all");
    };
}

// Shopping Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartDOM = document.querySelector(".cart-dom");
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');

if (cart.length > 0) {
    cart.forEach((cartItem) => {
        insertItemToDOM(cartItem);
        handleButtons(cartItem);
    });
}

addToCartButtonsDOM.forEach((addToCartButtonDOM) => {
    addToCartButtonDOM.addEventListener("click", () => {
        const productDOM = addToCartButtonDOM.parentNode;
        const product = {
            image: productDOM.querySelector(".card-img").getAttribute("src"),
            price: productDOM.querySelector(".price").innerText,
            name: productDOM.querySelector(".product-name").innerText,
            quantity: 1
        };
        const isInCart = cart.some((cartItem) => cartItem.name === product.name);
        if (!isInCart) {
            insertItemToDOM(product);
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            addToCartButtonDOM.innerText = "In Cart";
            addToCartButtonDOM.disabled = true;
            handleButtons(product);
        }
    });
});

function insertItemToDOM(product) {
    cartDOM.insertAdjacentHTML("beforeend", `
        <div class="cart_item">
            <img class="cart_item_image" src="${product.image}" alt="${product.image}">
            <h3 class="cart_item_name">${product.name}</h3>
            <h3 class="cart_item_price">${product.price}</h3>
            <button class="btn decrease-btn" data-action="DECREASE_ITEM">&minus;</button>
            <h3 class="cart__item__quantity">${product.quantity}</h3>
            <button class="btn increase-btn" data-action="INCREASE_ITEM">&plus;</button>
            <button class="btn remove-btn" data-action="REMOVE_ITEM">&times;</button>
        </div>
    `);
}

function handleButtons(product) {
    const cartItemsDOM = cartDOM.querySelectorAll(".cart_item");
    cartItemsDOM.forEach((cartItemDOM) => {
        if (cartItemDOM.querySelector('.cart_item_name').innerText === product.name) {
            cartItemDOM.querySelector('.increase-btn').addEventListener("click", () => {
                cart.forEach((cartItem) => {
                    if (cartItem.name === product.name) {
                        cartItem.quantity++;
                        cartItemDOM.querySelector('.cart__item__quantity').innerText = cartItem.quantity;
                        localStorage.setItem('cart', JSON.stringify(cart));
                    }
                });
            });
            cartItemDOM.querySelector('.decrease-btn').addEventListener("click", () => {
                cart.forEach((cartItem) => {
                    if (cartItem.name === product.name) {
                        if (cartItem.quantity > 1) {
                            cartItem.quantity--;
                            cartItemDOM.querySelector('.cart__item__quantity').innerText = cartItem.quantity;
                            localStorage.setItem('cart', JSON.stringify(cart));
                        } else {
                            cartItemDOM.remove();
                            cart = cart.filter((cartItem) => cartItem.name !== product.name);
                            const addToCartButtonDOM = document.querySelector(`button[data-action="ADD_TO_CART"][disabled]`);
                            if (addToCartButtonDOM) {
                                addToCartButtonDOM.innerText = "Add to Cart";
                                addToCartButtonDOM.disabled = false;
                            }
                            localStorage.setItem('cart', JSON.stringify(cart));
                        }
                    }
                });
            });
            cartItemDOM.querySelector('.remove-btn').addEventListener("click", () => {
                cart.forEach((cartItem) => {
                    if (cartItem.name === product.name) {
                        cartItemDOM.remove();
                        cart = cart.filter((cartItem) => cartItem.name !== product.name);
                        const addToCartButtonDOM = document.querySelector(`button[data-action="ADD_TO_CART"][disabled]`);
                        if (addToCartButtonDOM) {
                            addToCartButtonDOM.innerText = "Add to Cart";
                            addToCartButtonDOM.disabled = false;
                        }
                        localStorage.setItem('cart', JSON.stringify(cart));
                    }
                });
            });
        }
    });
}