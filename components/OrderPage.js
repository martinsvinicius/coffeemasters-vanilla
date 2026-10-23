class OrderPageElement extends HTMLElement {
  #userForm = {
    name: "",
    phone: "",
    email: "",
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.#loadCSS();
  }

  connectedCallback() {
    const section = document.createElement("section");
    this.shadow.appendChild(section);

    window.addEventListener("appcartchange", () => {
      this.#render();
    });

    this.#render();
  }

  #render() {
    const section = this.shadow.querySelector("section");

    if (app.store.cart.size == 0) {
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;

      return;
    }

    section.innerHTML = `
        <h2>Your Order</h2>
        <ul>
        </ul>
    `;

    const template = document.getElementById("order-form-template");
    const content = template.content.cloneNode(true);
    section.appendChild(content);

    let total = 0;
    for (const [_, cartItem] of app.store.cart) {
      const item = document.createElement("cart-item");
      item.dataset.item = JSON.stringify(cartItem);
      this.shadow.querySelector("ul").appendChild(item);

      total += cartItem.quantity * cartItem.product.price;
    }
    this.shadow.querySelector("ul").innerHTML += `
          <li>
              <p class='total'>Total</p>
              <p class='price-total'>$${total.toFixed(2)}</p>
          </li>
      `;
    this.#bindForm(this.shadow.querySelector("form"));
  }

  #bindForm(form) {
    this.#userForm = new Proxy(this.#userForm, {
      set(target, p, newValue) {
        target[p] = newValue;

        if (p in form.elements) {
          form.elements[p].value = newValue;
        }

        return true;
      },
    });

    for (const element of form.elements) {
      element.addEventListener("change", (event) => {
        this.#userForm[element.name] = event.target.value;
      });
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(`Thank you for your order ${this.#userForm.name}`);
      this.#clearUserForm();
    });
  }

  #clearUserForm() {
    this.#userForm.name = "";
    this.#userForm.email = "";
    this.#userForm.phone = "";
  }

  async #loadCSS() {
    const res = await fetch("/components/OrderPage.css");
    if (!res.ok) return "";
    const cssTxt = await res.text();
    const styleEl = document.createElement("style");
    styleEl.textContent = cssTxt;
    this.shadow.appendChild(styleEl);
  }
}
customElements.define("order-page", OrderPageElement);
