import { ObjectId } from "mongodb";
import { db } from "../../auth.js";

const collection = db.collection("products");

export const ProductService = {
  async createProduct(payload: Record<string, unknown>) {
    const result = await collection.insertOne({
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return result;
  },

  async getSellerProducts(sellerId: string) {
    return await collection
      .find({
        sellerId,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();
  },

  async deleteProduct(id: string) {
    return await collection.deleteOne({
      _id: new ObjectId(id),
    });
  },

  async getAllProducts() {
  return await collection
    .find({})
    .sort({
      createdAt: -1,
    })
    .toArray();
},

  async getSingleProduct(id: string) {
    return await collection.findOne({
      _id: new ObjectId(id),
    });
  },

  async updateProduct(
    id: string,
    payload: Record<string, unknown>
  ) {
    return await collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...payload,
          updatedAt: new Date(),
        },
      }
    );
  },
};