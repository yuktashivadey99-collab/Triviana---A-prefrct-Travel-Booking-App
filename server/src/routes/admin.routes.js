import { Router } from "express";
import { getDashboardStats, getAllUsers, toggleUserStatus } from "../controllers/admin.controller.js";
import { verifyJWT, isAdmin } from "../middleware/auth.middleware.js";

const router = Router();
router.use(verifyJWT, isAdmin);
router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.put("/users/:id/toggle", toggleUserStatus);
export default router;