import express from "express";
import "./LoaderEnvironmentVariable";
import AppRoutes from "../routes/index";

const app = express();
const cors = require("cors");

// Setting middleware make parse datas to json.
app.use(express.json());

// Setting middleware enable cors in application.
app.use(cors());

// Loading routes application.
AppRoutes(app);

export default app;