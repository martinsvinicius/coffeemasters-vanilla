const resolveUrl = () => {
  const isGhPages = window.location.origin.endsWith(".github.io");
  const rootPath = isGhPages ? "/coffeemasters-vanilla" : "";
  return window.location.origin + rootPath;
};

export const API = {
  url: resolveUrl(),
  fetchMenu: async () => {
    const result = await fetch(`${API.url}/data/menu.json`);

    if (!result.ok) throw new Error("Could not fetch menu");

    return result.json();
  },
};
