import { app } from "../app.js";
import adminRouter from "./Admin.js";
import authRouter from "./Auth.js";
import skillRouter from "./Skill.js";
import personalRouter from "./personalRouter.js";

const Routes = () => {
    app.use("/skills", skillRouter);
    app.use("/admin" , adminRouter) ;
    app.use("/personal" , personalRouter )
    app.use("/auth" , authRouter )
};

export default Routes;
