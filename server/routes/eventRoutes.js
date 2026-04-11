const express = require("express");
const eventRoutes = express.Router();

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

const { protect, admin } = require("../middlewares/auth");

eventRoutes.get("/", getAllEvents);
eventRoutes.get("/:id", getEventById);
eventRoutes.post("/", protect, admin, createEvent);
eventRoutes.put("/:id", protect, admin, updateEvent);
eventRoutes.delete("/:id", protect, admin, deleteEvent);

module.exports = eventRoutes;