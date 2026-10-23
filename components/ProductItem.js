import { addToCart } from "../services/order.js";

class ProductItemElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("product-item-template");
    const contentClone = template.content.cloneNode(true);

    this.appendChild(contentClone);

    const product = JSON.parse(this.dataset.product);
    this.querySelector("h4").textContent = product.name;
    this.querySelector("p.price").textContent = `${product.price.toFixed(2)}`;
    this.querySelector("img").src = `data/images/${product.image}`;

    const linkElement = this.querySelector("a");
    linkElement.addEventListener("click", (event) => {
      event.preventDefault();
      app.router.navigate(`/product/${product.id}`);
    });

    const addToCardButtonElement = linkElement.querySelector("button");
    addToCardButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      addToCart(product.id);
    });
  }
}

customElements.define("product-item", ProductItemElement);
