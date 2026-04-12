require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/collections", require("./routes/collectionRoutes"));
app.use("/api", require("./routes/dynamicRoutes"));
app.use("/stats", require("./routes/statsRoutes"));

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);