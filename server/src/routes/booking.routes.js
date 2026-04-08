import { Router } from "express";
import { createBooking, getMyBookings, getBookingById, cancelBooking, getAllBookings } from "../controllers/booking.controller.js";
import { verifyJWT, isAdmin } from "../middleware/auth.middleware.js";

const router = Router();
router.use(verifyJWT);
router.post("/", createBooking);
router.get("/my", getMyBookings);
router.get("/all", isAdmin, getAllBookings);
router.get("/:id", getBookingById);
router.put("/:id/cancel", cancelBooking);
export default router;