import { lazy } from "react";

export const Users = lazy(() => import('./users.view'));
export const Gallery = lazy(() => import('./gallery.view'));
export const Products = lazy(() => import('./products.view'));
export const Cart = lazy(() => import('./cart.view'));
