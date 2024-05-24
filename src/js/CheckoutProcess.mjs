import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"

const externalServices = new ExternalServices();

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

    async checkout() {
        const form = document.forms["checkout-form"];

        const json = formDataToJson(form);

        json.orderDate = new Date();
        json.subtotal = this.subtotal;
        json.shipping = this.shipping;
        json.tax = this.tax;
        json.orderTotal = this.orderTotal;
        json.items = packageItems(this.cartItems);

        try {
            const response = await externalServices.checkOut(json);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}

function packageItems(items) {
    const simplerItems = items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.quantity,
        };

        return simplerItems;
    })
}

function formDataToJson(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}