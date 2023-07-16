import express from "express";
import { app } from "../app.js";
import Cors from "cors" ;
import cookieParser from "cookie-parser";



const midllewares = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(Cors({credentials : true , origin : true }))
    app.use(cookieParser(process.env.COOKIE_SECRET_CODE));
};

export default midllewares;
