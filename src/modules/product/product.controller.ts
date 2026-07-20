import { Request, Response } from "express";
import { ProductService } from "./product.service.js";

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await ProductService.createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product.",
      error,
    });
  }
};

export const getSellerProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const { sellerId } = req.params;

    const result =
      await ProductService.getSellerProducts(sellerId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
      error,
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await ProductService.deleteProduct(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
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

export const getSingleProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await ProductService.getSingleProduct(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product.",
      error,
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await ProductService.updateProduct(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
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

export const getAllProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await ProductService.getAllProducts();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
      error,
    });
  }
};
export const getProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await ProductService.getProducts();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
      error,
    });
  }
};