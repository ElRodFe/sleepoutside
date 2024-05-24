import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkOut = new CheckoutProcess("so-cart", ".orderSummary");
checkOut.init();

const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const form = document.forms["checkout-form"];
    const formValidity = form.checkValidity();
    form.reportValidity();

    if (formValidity) {
        checkOut.checkout();
        location.assign("/checkout/success.html");
        localStorage.clear();
    }
});

