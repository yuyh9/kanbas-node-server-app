import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignment/routes.js";
import UserRoutes from "./users/routes.js";
import session from "express-session";
const CONNECTION_STRING = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
// check connected successfully
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB');
  console.log(`Database name: ${db.name}`);
});

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : process.env.FRONTEND_URL_LOCAL,
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(
  session(sessionOptions)
);

app.use(express.json());
UserRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
