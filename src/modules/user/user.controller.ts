import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { db } from "../../auth.js";


export const updateRole = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "userId and role are required",
      });
    }

    await db.collection("user").updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          role,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update role",
    });
  }
};