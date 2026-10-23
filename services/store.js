const StoreObj = {
  menu: null,
  cart: new Map(),
};

export const Store = new Proxy(StoreObj, {
  set: (target, p, newValue) => {
    target[p] = newValue;

    if (p === "menu") {
      window.dispatchEvent(new Event("appmenuchange"));
    }

    if (p === "cart") {
      window.dispatchEvent(new Event("appcartchange"));
    }

    return true;
  },
});
