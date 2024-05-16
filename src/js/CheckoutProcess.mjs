import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, htmlElement) {
        this.key = key;
        this.htmlElement = document.querySelector(htmlElement);
        this.cartItems = [];
        this.subtotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.cartItems = getLocalStorage(this.key);
        this.calculateSubtotal();
    }

    calculateSubtotal() {
        this.cartItems.forEach((item) => {
            this.subtotal += item.FinalPrice
        });
        const numberOfItems = this.cartItems.length;
        this.calculateOrderTotal(numberOfItems);
    }

    calculateOrderTotal(numberOfItems) {
        this.shipping = parseFloat((10 + numberOfItems * 2).toFixed(2));
        this.tax = parseFloat((this.subtotal * 0.06).toFixed(2));
        this.orderTotal = (this.subtotal + this.shipping + this.tax).toFixed(2);

        this.displayOrderTotals();

    }

    displayOrderTotals() {
        const st = document.createElement("p");
        const sp = document.createElement("p");
        const t = document.createElement("p");
        const ot = document.createElement("p");

        st.textContent = `Subtotal: $${this.subtotal}`;
        sp.textContent = `Shipping: $${this.shipping}`;
        t.textContent = `Tax: $${this.tax}`;
        ot.textContent = `Order Total: $${this.orderTotal}`;

        this.htmlElement.appendChild(st);
        this.htmlElement.appendChild(sp);
        this.htmlElement.appendChild(t);
        this.htmlElement.appendChild(ot);
    }
}

const checkOut = new CheckoutProcess("so-cart", ".orderSummary");
checkOut.init();