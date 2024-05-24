import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart(".product-list");
cart.renderCart();

const spans = document.querySelectorAll("span");
spans.forEach(span => {
    span.addEventListener("click", () => {
        cart.removeItem(span.id);
        location.reload()
    });
});