import { Request, Response } from "express";
import { auth, db } from "../../auth.js";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      password,
      image,
      role,
    } = req.body;

    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        image,
      },
    });

    await db.collection("user").updateOne(
      {
        email,
      },
      {
        $set: {
          role,
        },
      }
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Registration failed",
    });
  }
};