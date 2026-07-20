import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import productRoutes from "./modules/product/product.route.js";
import cartRoutes from "./modules/cart/cart.route.js";
const app = express();
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db(process.env.DB_NAME);
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.all("/api/auth/*", toNodeHandler(auth));
/* --------------------------
   CUSTOM REGISTER ROUTE
--------------------------- */
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, image, role } = req.body;
        // Better Auth user create
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                image,
            },
        });
        // Update role
        await db.collection("user").updateOne({ email }, {
            $set: {
                role: role ?? "customer",
            },
        });
        res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Registration failed",
        });
    }
});
/* -------------------------- */
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "PickCart Server Running",
    });
});
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
