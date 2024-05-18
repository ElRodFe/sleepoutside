import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkOut = new CheckoutProcess("so-cart", ".orderSummary");
checkOut.init();

const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms["checkout-form"];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) {
    checkOut.checkout();
    location.assign("/checkout/success.html");
    localStorage.clear();
  }
});
