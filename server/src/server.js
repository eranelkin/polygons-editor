require("dotenv").config();
const express = require("express");
const cors = require("cors");
const polygonRoutes = require("./routes/polygonRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/polygons", polygonRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
