import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkOut = new CheckoutProcess("so-cart", ".orderSummary");
checkOut.init();

const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    checkOut.checkout();
});