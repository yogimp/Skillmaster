import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();
require("dotenv").config();

// BODY PARSER
app.use(express.json({limit: "50mb"}));

// COOKIE PARSER
app.use(cookieParser());

// CORS => CROSS ORIGIN RESOURCE SHARING
app.use(cors({
    origin: process.env.ORIGIN,
}))

// TESTING API
app.get("/test", (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Api is working"
    })
})

// UNKNOWN ROUTE
app.all("*", (req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
})