import { application, Express,Request,Response } from "express";
import authRoutes from "./AuthRoutes"

export function registerRoutes(app:Express){

    app.get("/health",(req:Request,res:Response)=>{
        res.status(200).json({message:"server working properly"})
    });

    app.use("/auth",authRoutes);
}