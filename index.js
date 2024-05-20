import express from "express";
import { bootstrap } from "./src/index.router.js";


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
bootstrap(app,express)
app.listen(port , ()=>{console.log("server is running..");})