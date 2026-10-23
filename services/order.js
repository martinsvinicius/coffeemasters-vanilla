import { getProductById } from "./menu.js";

export async function addToCart(id) {
  const updatedCart = new Map(app.store.cart);

  if (updatedCart.has(id)) {
    const existingCartItem = updatedCart.get(id);
    updatedCart.set(id, {
      ...existingCartItem,
      quantity: existingCartItem.quantity + 1,
    });
    app.store.cart = updatedCart;
    return;
  }

  const product = await getProductById(id);

  if (!product) return;

  updatedCart.set(id, { product, quantity: 1 });
  app.store.cart = updatedCart;
}

export function removeFromCart(id) {
  const updatedCart = new Map(app.store.cart);

  if (!updatedCart.has(id)) return;

  const existingCartItem = updatedCart.get(id);

  if (existingCartItem.quantity > 1) {
    updatedCart.set(id, {
      ...existingCartItem,
      quantity: existingCartItem.quantity - 1,
    });
    app.store.cart = updatedCart;
    return;
  }

  updatedCart.delete(id);
  app.store.cart = updatedCart;
}
