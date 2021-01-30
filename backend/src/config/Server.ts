import express from "express";
import swaggerUi from "swagger-ui-express";
import "./LoaderEnvironmentVariable";
import swaggerSpec from "./Swagger";
import AppRoutes from "../routes/index";

const app = express();
const cors = require("cors");

// Setting middleware make parse datas to json.
app.use(express.json());

// Setting middleware enable cors in application.
app.use(cors());

/**
 * @description Setting route with documentation swagger.
 */
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Loading routes application.
AppRoutes(app);

export default app; 