import { getProductById } from "../services/menu.js";
import { addToCart } from "../services/order.js";

class DetailsPageElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.#loadCss();
  }

  connectedCallback() {
    const template = document.getElementById("details-page-template");
    const contentNode = template.content.cloneNode(true);
    this.shadow.appendChild(contentNode);
    this.#render();
  }

  async #render() {
    const productId = this.dataset.id;

    if (!productId) {
      alert("Invalid Product ID");
      return;
    }

    this.product = await getProductById(productId);
    this.shadow.querySelector("h2").textContent = this.product.name;
    this.shadow.querySelector("img").src = `/data/images/${this.product.image}`;
    this.shadow.querySelector(".description").textContent =
      this.product.description;
    this.shadow.querySelector(".price").textContent =
      `$ ${this.product.price.toFixed(2)} ea`;
    this.shadow.querySelector("button").addEventListener("click", () => {
      addToCart(this.product.id);
      app.router.navigate("/order");
    });
  }

  async #loadCss() {
    const res = await fetch("/components/DetailsPage.css");
    if (!res.ok) return "";
    const cssTxt = await res.text();
    const styleEl = document.createElement("style");
    styleEl.textContent = cssTxt;
    this.shadow.appendChild(styleEl);
  }
}

customElements.define("details-page", DetailsPageElement);
