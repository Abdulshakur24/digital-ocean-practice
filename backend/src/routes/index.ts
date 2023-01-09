import { Router } from "express";
import userRoutes from "./user";

export default Router().use("/user", userRoutes);
