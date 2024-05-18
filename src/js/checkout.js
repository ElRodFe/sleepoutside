import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, alertMessage, removeAllAlerts } from "./utils.mjs";

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
    removeAllAlerts();
    checkOut.checkout();
    location.assign("/checkout/success.html");
    localStorage.clear();
  }
  else{
    removeAllAlerts();
    const invalidMessage = Array.from(myForm.querySelectorAll(":invalid"));
    invalidMessage.forEach((invalidField)=>{
      if(invalidField.tagName === "INPUT"){
        const message = invalidField.labels[0].textContent;
        alertMessage(`Invalid ${message}`);
      }
    })
  }
});
