import { app } from "../app.js";
import adminRouter from "./Admin.js";
import authRouter from "./Auth.js";
import skillRouter from "./Skill.js";

const Routes = () => {
    app.use("/skills", skillRouter);
    app.use("/admin" , adminRouter) ;
    app.use("/auth" , authRouter )
};

export default Routes;
