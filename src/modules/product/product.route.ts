import { Router } from "express";
import {
  createProduct,
  getSellerProducts,
  getSingleProduct,
  updateProduct,
} from "./product.controller.js";
import { deleteProduct } from "./product.controller.js";

const router = Router();

router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.get("/seller/:sellerId", getSellerProducts);
router.get("/:id", getSingleProduct);

router.patch("/:id", updateProduct);

export default router;