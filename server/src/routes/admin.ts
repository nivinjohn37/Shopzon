import {jwt} from "jsonwebtoken";
import * as express from "express";
import {SECRET, authenticateJwt} from "../middleware"
import {Admin, Product} from "../db/models";

import {Request, Response} from "express";

const router = express.Router();

interface CreateTodoInput{
    title: string,
    description: string
}



router.post("/signup", async (req:Request, res: Response) =>{
    const parsedInput = signupProps.safeParse(req.body);
    if(!parsedInput.success){
        res.status(411).json({
            error: parsedInput.error
        })
        return;
    }
})