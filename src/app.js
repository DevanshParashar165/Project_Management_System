import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//basic configuration
app.use(express.json({limit : "16kb"}))
app.use(urlencoded({extended : true,limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//cors configuration
app.use(cors({
    origin : process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials : true,
    methods : ['PUT','GET','POST','PATCH','DELETE','OPTIONS','HEAD'],
    allowedHeaders : ["Content-Type","Authorization"]
}))

import healthCheckRouter from "./routes/healthCheck.routes.js";
import authRouter from "./routes/auth.routes.js";


app.use('/api/v1/healthcheck',healthCheckRouter)
app.use('/api/v1/auth',authRouter)

export default app;