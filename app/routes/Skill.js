import express from "express";

import { addSkill, getSkills } from "../controller/SkillController.js";

const skillRouter = express.Router();

skillRouter.get("/", getSkills);

skillRouter.post("/add-skill",addSkill);

export default skillRouter;
