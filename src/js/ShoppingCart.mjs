import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">Qty: ${item.quantity}</p>
    <p class="cart-card__price">Price: $${item.FinalPrice}</p>
    <p class="cart-card__total">Total: $${item.totalPrice}</p>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
  }

  renderCart() {
    const cartItems = getLocalStorage("so-cart");

    if (cartItems == null) {
      const p = document.createElement("p");
      p.textContent = "No items yet";
      document.querySelector(".product-list").appendChild(p);
      const checkoutButton = document.querySelector(".checkout-button");
      checkoutButton.classList.add("hide");
    } else {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.htmlElement).innerHTML = htmlItems.join("");

      const cartTotal = document.querySelector(".cart-total");
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice += item.totalPrice
      });
      cartTotal.textContent = `Total: $${totalPrice}`;
      document.querySelector(".cart-footer-hide").style.display = "block";
      const checkoutButton = document.querySelector(".checkout-button");
      checkoutButton.classList.remove("hide");

    }
  }
}