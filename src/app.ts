import express from "express";
import config from "./config/config"
import {router} from "./routes/employees" 

const app = express();
app.use(express.json())
app.use(router)
app.set("port", config.port);

export { app };
