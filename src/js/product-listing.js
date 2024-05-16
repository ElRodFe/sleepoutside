import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParams("category");
const productData = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductListing(category, productData, element);

productList.init();
