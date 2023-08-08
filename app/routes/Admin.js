import express from "express";
import { checkExist, loginAdmin, registerAdmin } from "../controller/AdminController.js";
import Cors from "cors";
import adminModel from "../model/AdminModel.js";
import { existMobile, existUser } from "../utils.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

adminRouter.post("/register", registerAdmin);

adminRouter.post("/check", checkExist);

export default adminRouter;
