import express from "express";
import { authAdminToken } from "../controller/TokenController.js";

const authRouter = express.Router();

authRouter.get("/admintoken" , authAdminToken )

export default authRouter;
