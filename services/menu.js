import { API } from "./api.js";

export async function loadMenuData() {
  const menuData = await API.fetchMenu();
  app.store.menu = menuData;
}

export async function getProductById(id) {
  if (!app.store.menu) {
    await loadMenuData();
  }

  for (const c of app.store.menu) {
    for (const p of c.products) {
      if (p.id == id) return p;
    }
  }

  return null;
}
