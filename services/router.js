// SPA router built on top of the Window.history API
export const Router = {
  init: () => {
    const navLinks = document.querySelectorAll(".navlink");

    for (const a of navLinks) {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const route = event.target.getAttribute("href");
        Router.navigate(route);
      });
    }

    window.addEventListener("popstate", (e) => {
      Router.navigate(e.state.route, true);
    });

    Router.navigate(location.pathname);
  },
  navigate: (route, replace = false) => {
    const state = { route };

    if (replace) {
      history.replaceState(state, null, route);
    } else {
      history.pushState(state, null, route);
    }

    let pageNode = null;

    switch (route) {
      case "/":
        pageNode = document.createElement("h1");
        pageNode.textContent = "Menu";
        break;
      case "/order":
        pageNode = document.createElement("h1");
        pageNode.textContent = "Your Order";
        break;
      default:
        if (route.startsWith("/product/")) {
          pageNode = document.createElement("h1");
          pageNode.textContent = "Details";
          const paramId = route.substring(route.lastIndexOf("/") + 1);
          pageNode.dataset.id = paramId;
        }
        break;
    }

    if (!pageNode) return;

    const mainEl = document.querySelector("#main");
    mainEl.children[0]?.remove();
    mainEl.appendChild(pageNode);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  },
};
