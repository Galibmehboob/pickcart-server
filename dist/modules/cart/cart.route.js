import { Router } from "express";
import { addToCart, getUserCart, updateCartQuantity, removeCartItem, clearCart, } from "./cart.controller.js";
const router = Router();
router.post("/", addToCart);
router.get("/:userId", getUserCart);
router.patch("/:id", updateCartQuantity);
router.delete("/:id", removeCartItem);
router.delete("/clear/:userId", clearCart);
export default router;
