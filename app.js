import "dotenv/config";
import express from "express";
import cors from "cors";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignment/routes.js";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : process.env.FRONTEND_URL_LOCAL,
    origin: process.env.FRONTEND_URL
  }));
app.use(express.json());
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app)
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);