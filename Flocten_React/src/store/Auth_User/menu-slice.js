import { getMenuByRole } from "./types.js";

export const createMenuSlice = (set, get) => ({
  menu: [],

  updateMenuByRole: (role) => {
  
    const menuItems = getMenuByRole(role);
   
    set({ menu: menuItems });
  },

  updateMenuLink: (menuId, newLink) =>
    set((state) => ({
      menu: state.menu.map((item) =>
        item.id === menuId ? { ...item, Link: newLink } : item
      ),
    })),
});
