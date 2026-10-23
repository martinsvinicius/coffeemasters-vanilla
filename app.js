import { loadMenuData } from "./services/menu.js";
import { Router } from "./services/router.js";
import { Store } from "./services/store.js";

// Link Web Components
import "./components/MenuPage.js";
import "./components/DetailsPage.js";
import "./components/OrderPage.js";
import "./components/ProductItem.js";
import "./components/CartItem.js";

window.app = { store: Store, router: Router };

// The "load" event is triggered when EVERYTHING is loaded including fonts, stylesheets, images, videos, etc. Using this event type means we're missing the opportunity to manipulate the DOM earlier.
// The "DOMContentLoaded" event is triggered when the DOM is ready, before rendering.
// Since the DOM may not be ready/in-memory when this script is executed,
// we need to wait for the DOMContentLoaded event before any DOM manipulation.
window.addEventListener("DOMContentLoaded", async () => {
  app.router.init();
  loadMenuData();
});

window.addEventListener("appcartchange", () => {
  const badge = document.getElementById("badge");
  let totalCartCount = 0;
  for (const [_, cartItem] of app.store.cart) {
    totalCartCount += cartItem.quantity;
  }
  badge.textContent = totalCartCount;
  badge.hidden = !totalCartCount;
});
