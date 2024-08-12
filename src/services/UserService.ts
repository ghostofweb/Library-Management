import bcrypt from "bcrypt"

import {config} from "../config";

import UserDao,{IUserModel} from "../daos/Userdao";
import {Iuser} from "../config/models/User"
import { UnableToSaveError ,invalidUsernameorPasswordError} from "../utils/LibraryErrors";

export async function register(user:Iuser):Promise<IUserModel>{
    const ROUNDS = config.server.rounds;

    try {
        const hashPassowrd = await bcrypt.hash(user.password,ROUNDS)
        const saved = new UserDao({...user,password:hashPassowrd});

        return await saved.save();
    } catch (error:any) {
        throw new UnableToSaveError(error.message);
    }
} 

export async function login(credentials:{email:string,password:string}):Promise<IUserModel> {
        const {email,password} = credentials;
        try {

            const user =  await UserDao.findOne({email});
            if (!user) {
                throw new invalidUsernameorPasswordError("Invalid username or password")
            } else {
                const validPassword: boolean = await bcrypt.compare(password,user.password);
                if(validPassword){
                    return user;
                }
                else{
                    throw new invalidUsernameorPasswordError("Invalid username or password")
                }
            }
        } catch (error:any) {
            throw error;
        }
}