import { ObjectId } from "mongodb";
import { db } from "../../auth.js";
const collection = db.collection("products");
export const ProductService = {
    async createProduct(payload) {
        const result = await collection.insertOne({
            ...payload,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return result;
    },
    async getSellerProducts(sellerId) {
        return await collection
            .find({
            sellerId,
        })
            .sort({
            createdAt: -1,
        })
            .toArray();
    },
    async deleteProduct(id) {
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
    async getProducts() {
        return await collection
            .find({})
            .sort({
            createdAt: -1,
        })
            .toArray();
    },
    async getSingleProduct(id) {
        return await collection.findOne({
            _id: new ObjectId(id),
        });
    },
    async updateProduct(id, payload) {
        return await collection.updateOne({
            _id: new ObjectId(id),
        }, {
            $set: {
                ...payload,
                updatedAt: new Date(),
            },
        });
    },
};
