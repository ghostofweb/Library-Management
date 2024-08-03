import express from "express";
import AuthControllers from "../controllers/AuthControllers";
import { Schema, ValidateSchema } from "../middlewares/Validation";

const router = express.Router();

router.post("/register",ValidateSchema(Schema.user.create),AuthControllers.handleRegister);
router.post("/login",ValidateSchema(Schema.user.login),AuthControllers.handleLogin);

export =  router;
