import { loadMenuData } from "./services/menu.js";
import { Router } from "./services/router.js";
import { Store } from "./services/store.js";

window.app = { store: Store, router: Router };

// The "load" event is triggered when EVERYTHING is loaded including fonts, stylesheets, images, videos, etc. Using this event type means we're missing the opportunity to manipulate the DOM earlier.
// The "DOMContentLoaded" event is triggered when the DOM is ready, before rendering.
// Since the DOM may not be ready/in-memory when this script is executed,
// we need to wait for the DOMContentLoaded event before any DOM manipulation.
window.addEventListener("DOMContentLoaded", async () => {
  app.router.init();
  loadMenuData();
});
