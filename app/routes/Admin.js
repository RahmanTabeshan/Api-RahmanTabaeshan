import express from "express";
import { loginAdmin, registerAdmin } from "../controller/AdminController.js";


const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin );

adminRouter.post("/register", registerAdmin);

export default adminRouter;
