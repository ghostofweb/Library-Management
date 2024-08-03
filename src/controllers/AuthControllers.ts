import { Request,Response } from "express";
import {register,login} from "../services/UserService"
import { Iuser } from "../config/models/User";
import { ifError } from "assert";
import { IUserModel } from "../daos/Userdao";
import { emit } from "process";
import { invalidUsernameorPasswordError } from "../utils/LibraryErrors";

async function handleRegister(req:Request,res:Response) {
    const user:Iuser = req.body;

    try {
        const  registeredUser = await register(user);
        res.status(201).json({
            message: "User successfully Created",
            user:{
                _id : registeredUser._id,
                type: registeredUser.type,
                firstName:registeredUser.firstName,
                lastName:registeredUser.email

            }
        })
    } catch (error:any) {
        if(error.message.includes("E11000 duplicate key error collection")){
            res.status(409).json("user already exit")
        }
        else{
            res.status(500).json({message: "Unale tp register user at the time" , error:error.message});
        }
        res.status(500).json({message:"Unable to register user at this time", error:error.message});

    }
}

async function handleLogin(req:Request,res:Response) {
    const credentials = req.body;

    try {
        const loggedIn:IUserModel = await login(credentials);
        res.status(200).json({
            _id:loggedIn._id,
            type: loggedIn.type,
            firstName:loggedIn.firstName,
            lastName : loggedIn.lastName,
            email:loggedIn.email
        })
    } catch (error:any) {
        if(error instanceof invalidUsernameorPasswordError){
            res.status(401).json({message:"Unable to login user at this time",error:error.message});
        }else{
        res.status(500).json({message:"Unable to login user at this time",error:error.message})
    }
}
}

export default {handleRegister,handleLogin}