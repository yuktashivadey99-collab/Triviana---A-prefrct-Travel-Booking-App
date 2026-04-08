import { Flight } from "../models/Flight.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const searchFlights = asyncHandler(async (req, res) => {
  const { from, to, date, flightClass = "economy" } = req.query;
  const query = { isActive: true };
  if (from) query["from.iataCode"] = from.toUpperCase();
  if (to) query["to.iataCode"] = to.toUpperCase();
  if (date) { const d = new Date(date); const next = new Date(d); next.setDate(next.getDate() + 1); query.departure = { $gte: d, $lt: next }; }
  const flights = await Flight.find(query).sort("departure");
  res.json(new ApiResponse(200, flights, "Flights fetched"));
});

export const getFlightById = asyncHandler(async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  if (!flight) throw new ApiError(404, "Flight not found");
  res.json(new ApiResponse(200, flight, "Flight fetched"));
});

export const createFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.create(req.body);
  res.status(201).json(new ApiResponse(201, flight, "Flight created"));
});