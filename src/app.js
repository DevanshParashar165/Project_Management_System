import express, { urlencoded } from "express";
import cors from "cors";

const app = express();

//basic configuration
app.use(express.json({limit : "16kb"}))
app.use(urlencoded({extended : true,limit : "16kb"}))
app.use(express.static("public"))

//cors configuration
app.use(cors({
    origin : process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials : true,
    methods : ['PUT','GET','POST','PATCH','DELETE','OPTIONS','HEAD'],
    allowedHeaders : ["Content-Type","Authorization"]
}))

import healthCheckRouter from "./routes/healthCheck.routes.js";


app.use('/api/v1/healthcheck',healthCheckRouter)

export default app;