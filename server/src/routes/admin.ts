import * as express from "express";
import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {SignupParams, signupProps} from "@nivdev/common";
import {Admin, User} from "../db/models";
import {SECRET, authenticateJwt} from "../middleware/auth"

const router = express.Router();

// Admin routes
router.get('/me', authenticateJwt, (req: Request, res: Response) => {
    res.json({
        username: req.user.username
    })
});

router.post("/signup", async (req: Request, res: Response) => {
    const parsedInput = signupProps.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json({
            message: parsedInput.error.issues[0].message
        })
        return;
    }
    const signupParams: SignupParams = {
        username: parsedInput.data.username,
        password: parsedInput.data.password
    }
    const user = await Admin.findOne({username: signupParams.username});
    if (user) {
        res.status(403).json({
            message: "Admin already exists"
        })
    } else {
        const newUser = new User({username: signupParams.username, password: signupParams.password});
        await newUser.save();
        const token = jwt.sign({
            username: signupParams.username,
            role: "admin"
        }, SECRET, {
            expiresIn: "1h"
        });
        res.json({ message: "Admin created successfully", token });
    }

})