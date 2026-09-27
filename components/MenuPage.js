export class MenuPageElement extends HTMLElement {
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
  }

  // private methods
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
