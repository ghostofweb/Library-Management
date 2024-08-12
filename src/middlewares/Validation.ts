import Joi,{func, ObjectSchema} from "joi";
import { NextFunction,Response,Request } from "express";
import { Iuser } from "../config/models/User";
import { login } from "../services/UserService";

export function ValidateSchema(schema:ObjectSchema){
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(422).json({message:"Object validation failed, please include a valid object"});
        }
    }
}

export const Schema = {
    user:{
            create:Joi.object<Iuser>({
            type:Joi.string().valid('ADMIN','EMPLOYEE','PATRON').required(),
            firstName:Joi.string().required(),
            lastName:Joi.string().required(),
            email: Joi.string().email().required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).message('Invalid email format'),
            password:Joi.string().required()
        }),
        login:Joi.object<{email:string,password:string}>({
            email: Joi.string().email().required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).message('Invalid email format'),
            password: Joi.string().required()
        })
    }
}