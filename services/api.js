export const API = {
  url: "http://localhost:3000",
  fetchMenu: async () => {
    const result = await fetch(`${API.url}/data/menu.json`);

    if (!result.ok) throw new Error("Could not fetch menu");

    return result.json();
  },
};
