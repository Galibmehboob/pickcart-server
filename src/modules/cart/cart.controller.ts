import { Request, Response } from "express";
import { CartService } from "./cart.service.js";

export const addToCart = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await CartService.addToCart(req.body);

    res.status(201).json({
      success: true,
      message: "Product added to cart.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product.",
      error,
    });
  }
};

export const getUserCart = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await CartService.getUserCart(
      req.params.userId
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart.",
      error,
    });
  }
};

export const updateCartQuantity = async (
  req: Request,
  res: Response
) => {
  try {
    const { quantity } = req.body;

    const result =
      await CartService.updateQuantity(
        req.params.id,
        quantity
      );

    res.status(200).json({
      success: true,
      message: "Cart updated.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed.",
      error,
    });
  }
};

export const removeCartItem = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await CartService.removeCartItem(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: "Item removed.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed.",
      error,
    });
  }
};

export const clearCart = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await CartService.clearCart(
        req.params.userId
      );

    res.status(200).json({
      success: true,
      message: "Cart cleared.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed.",
      error,
    });
  }
};