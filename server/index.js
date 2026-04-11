const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes=require('./routes/authRoutes');
const eventRoutes=require('./routes/eventRoutes');
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is reachable!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});