import { Router } from "express";
import { updateRole } from "./user.controller.js";
const router = Router();
router.patch("/role", updateRole);
export default router;
