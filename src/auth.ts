import "dotenv/config";

import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

await client.connect();
console.log(" MongoDB Connected Successfully");

export const db = client.db(process.env.DB_NAME!);
console.log(` Database: ${db.databaseName}`);
export const auth = betterAuth({
  database: mongodbAdapter(db),

  secret: process.env.BETTER_AUTH_SECRET!,

  baseURL: process.env.BETTER_AUTH_URL!,

  trustedOrigins: [process.env.CLIENT_URL!],

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: true,
      },
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }

      const body = ctx.body as Record<string, unknown>;

      return {
        context: {
          ...body,
          role: body.role === "seller" ? "seller" : "customer",
        },
      };
    }),
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});