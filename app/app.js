import Express from "express";
import midllewares from "./middleware/middlewares.js";
import Routes from "./routes/Routes.js";
import NotFound from "./middleware/404.js";
import Exeption from "./middleware/Exeption.js";
import dbConnect from "./service/Connection.js";

export const app = Express();

dbConnect();
midllewares();
Routes();
NotFound();
Exeption();

const appRun = (port) => {
    app.listen(port, () => {
        console.log(`this app run in port : ${port}`);
    });
};

export default appRun;
