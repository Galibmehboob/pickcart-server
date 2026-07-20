import { ObjectId } from "mongodb";
import { db } from "../../auth.js";
const collection = db.collection("cart");
export const CartService = {
    async addToCart(payload) {
        const existing = await collection.findOne({
            userId: payload.userId,
            productId: payload.productId,
        });
        if (existing) {
            return await collection.updateOne({
                _id: existing._id,
            }, {
                $inc: {
                    quantity: 1,
                },
                $set: {
                    updatedAt: new Date(),
                },
            });
        }
        return await collection.insertOne({
            ...payload,
            quantity: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    },
    async getUserCart(userId) {
        return await collection
            .find({
            userId,
        })
            .sort({
            createdAt: -1,
        })
            .toArray();
    },
    async updateQuantity(id, quantity) {
        return await collection.updateOne({
            _id: new ObjectId(id),
        }, {
            $set: {
                quantity,
                updatedAt: new Date(),
            },
        });
    },
    async removeCartItem(id) {
        return await collection.deleteOne({
            _id: new ObjectId(id),
        });
    },
    async clearCart(userId) {
        return await collection.deleteMany({
            userId,
        });
    },
};
