import { create } from "zustand";
import { createAuthSlice } from './auth-slice.js';
import { createSocketSlice } from './socket-slice.js';
import { createMenuSlice } from './menu-slice.js';

// Combinar todos los slices
export const useAuthStore = create((set, get) => ({
  ...createAuthSlice(set, get),
  ...createSocketSlice(set, get),
  ...createMenuSlice(set, get),
}));