"use strict";

// Cart initialization
let basket = JSON.parse(localStorage.getItem('data')) || [];
let label = document.getElementById('label');
let finalCart = document.getElementById('final-cart');

// Function to calculate total items in the cart
function itemCalculate() {
  let cartItem = document.getElementById("cartItems");
  let count = 0;
  basket.forEach((item) => (count += item.quantity));
  cartItem.textContent = count;
}

itemCalculate();

// Generate cart items in the DOM
let generateCart = () => {
  if (basket.length !== 0) {
    finalCart.innerHTML = basket.map((x) => {
      let { id, quantity } = x;
      let search = data.find((x) => x.id === id) || {};
      let { img, price, name } = search;
      return `
          <div class="cart-item">
            <img width="90" src=${img} alt="" />
            <div class="details">
              <div class="title-price-x">
                <h4 class="title-price">
                  <p>${name}</p>
                  <p class="cart-item-price">$${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-trash2-fill"></i>
              </div>
              <div class="cart-buttons">
                <div class="buttons">
                  <i onclick="cartDecrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${quantity}</div>
                  <i onclick="cartIncrement(${id})" class="bi bi-plus-lg"></i>
                </div>
              </div>
              <h3>$${quantity * price}</h3>
            </div>
          </div>
          `;
    }).join('');
  } else {
    finalCart.innerHTML = "";
    label.innerHTML = `
        <h2>Your cart is empty!</h2>
        <a href="index.html">
            <button class="home-btn">Back to Home</button>
        </a>
        `;
  }
};

// Decrement item quantity in the cart
let cartDecrement = (id) => {
  let searchItem = basket.find((x) => x.id === id);

  if (searchItem === undefined || searchItem.quantity === 0) return;
  searchItem.quantity -= 1;

  if (searchItem.quantity === 0) {
    basket = basket.filter((x) => x.id !== id);
  }

  localStorage.setItem("data", JSON.stringify(basket));
  generateCart();
  itemCalculate();
  generateTotalBill();
};

// Increment item quantity in the cart
let cartIncrement = (id) => {
  let searchItem = basket.find((x) => x.id === id);

  if (searchItem === undefined) {
    basket.push({ id, quantity: 1 });
    searchItem = basket[basket.length - 1];
  } else {
    searchItem.quantity += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  generateCart();
  itemCalculate();
  generateTotalBill();
};

// Remove item from the cart
let removeItem = (id) => {
  basket = basket.filter((x) => x.id !== id);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCart();
  itemCalculate();
  generateTotalBill();
};

// Generate total bill
let generateTotalBill = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let { id, quantity } = x;
      let itemCart = data.find((x) => x.id === id) || {};
      return quantity * itemCart.price;
    }).reduce((x, y) => x + y, 0);
    label.innerHTML = `
        <h2>Total Bill: $${amount}</h2>
        <button onclick="checkOut()" class="check-out">CheckOut</button>
        <button onclick="clearCart()" class="clear-cart">Clear Cart</button>
      `;
  } else {
    label.innerHTML = "";
  }
};

// Clear the cart
let clearCart = () => {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  generateCart();
  itemCalculate();
};

// Checkout function placeholder
let checkOut = () => {
  console.log("checked out!");
};

generateCart();
generateTotalBill();