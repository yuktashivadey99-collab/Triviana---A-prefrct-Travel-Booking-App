import { Router } from "express";
import { getAllHotels, getHotelById, getFeaturedHotels, createHotel, updateHotel, deleteHotel } from "../controllers/hotel.controller.js";
import { verifyJWT, isAdmin, isHotelOwner } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/", getAllHotels);
router.get("/featured", getFeaturedHotels);
router.get("/:id", getHotelById);
router.post("/", verifyJWT, isHotelOwner, createHotel);
router.put("/:id", verifyJWT, isHotelOwner, updateHotel);
router.delete("/:id", verifyJWT, isAdmin, deleteHotel);
export default router;