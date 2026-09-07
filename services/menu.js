import { API } from "./api.js";

export async function loadMenuData() {
  const menuData = await API.fetchMenu();
  app.store.menu = menuData;
}
