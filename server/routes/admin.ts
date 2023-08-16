import {jwt} from "jsonwebtoken";
import * as express from "express";
import {SECRET, authenticateJwt} from "../middleware"
import {Admin, Product} from "../db/models";
import {z} from "zod";
import {Request, Response} from "express";

const router = express.Router();

interface CreateTodoInput{
    title: string,
    description: string
}

const signupProps = z.object({
    username: z.string().min(5).max(50).email(),
    password: z.string().min(5).max(50)
});

router.post("/signup", async (req:Request, res: Response) =>{
    const parsedInput = signupProps.safeParse(req.body);
    if(!parsedInput.success){
        res.status(411).json({
            error: parsedInput.error
        })
        return;
    }
})