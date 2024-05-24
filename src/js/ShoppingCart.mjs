import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
    <span id="${item.Id}">x</span>
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
    } else {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.htmlElement).innerHTML = htmlItems.join("");

      const cartTotal = document.querySelector(".cart-total");
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice += item.FinalPrice
      });
      cartTotal.textContent = `Total: $${totalPrice}`;
      document.querySelector(".cart-footer-hide").style.display = "block";

    }
  }

  removeItem(itemID) {
    let productsList = getLocalStorage("so-cart");

    const productIndex = productsList.findIndex(item => item.Id === itemID);

    if (productIndex !== -1) {
      productsList.splice(productIndex, 1);
    }

    setLocalStorage("so-cart", productsList);
    this.renderCart();
  }
}