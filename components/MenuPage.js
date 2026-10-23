class MenuPageElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.#loadCss();
  }

  // when the component is attached to the DOM
  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const contentNode = template.content.cloneNode(true);
    this.shadow.appendChild(contentNode);

    if (app.store.menu != null) {
      this.#render();
    }

    window.addEventListener("appmenuchange", () => {
      this.#render();
    });
  }

  // private methods
  #render() {
    const menuElement = this.shadow.querySelector("#menu");

    if (!app.store.menu) {
      menuElement.innerHTML = "Loading...";
      return;
    }

    menuElement.innerHTML = "";

    for (const category of app.store.menu) {
      const liCategory = document.createElement("li");
      liCategory.innerHTML = `
        <h3>${category.name}</h3>
        <ul class='category'>
        </ul>
      `;
      menuElement.appendChild(liCategory);

      for (const product of category.products) {
        const productItemElement = document.createElement("product-item");
        productItemElement.dataset.product = JSON.stringify(product);
        liCategory.querySelector("ul").appendChild(productItemElement);
      }
    }
  }

  async #loadCss() {
    const res = await fetch("/components/MenuPage.css");
    if (!res.ok) return "";
    const cssTxt = await res.text();
    const styleEl = document.createElement("style");
    styleEl.textContent = cssTxt;
    this.shadow.appendChild(styleEl);
  }
}

customElements.define("menu-page", MenuPageElement);
