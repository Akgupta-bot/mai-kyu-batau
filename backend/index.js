const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const AuthRoute = require("./Routes/AuthRoute");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


app.get("/ping", (req, res) => {
  res.json({ status: "ok", message: "Backend is reachable" });
});


app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/", AuthRoute);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});