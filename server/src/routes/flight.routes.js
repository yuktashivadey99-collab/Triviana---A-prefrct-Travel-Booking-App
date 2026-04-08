import { Router } from "express";
import { searchFlights, getFlightById, createFlight } from "../controllers/flight.controller.js";
import { verifyJWT, isAdmin } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/", searchFlights);
router.get("/:id", getFlightById);
router.post("/", verifyJWT, isAdmin, createFlight);
export default router;