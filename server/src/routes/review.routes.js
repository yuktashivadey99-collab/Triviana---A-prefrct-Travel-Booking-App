import { Router } from "express";
import { createReview, getHotelReviews, deleteReview } from "../controllers/review.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.post("/:hotelId", verifyJWT, createReview);
router.get("/:hotelId", getHotelReviews);
router.delete("/:id", verifyJWT, deleteReview);
export default router;