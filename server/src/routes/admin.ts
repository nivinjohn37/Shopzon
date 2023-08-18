import * as express from "express";
import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {SignupParams, signupProps} from "@nivdev/common";
import {Admin, User} from "../db/models";
import {authenticateJwt, SECRET} from "../middleware/auth";

const router = express.Router();

// Admin routes
router.get('/me', authenticateJwt, async (req: Request, res: Response) => {
    const userId = req.headers["userId"];
    const user: any = await User.findOne({_id: userId});
    if (user) {
        res.json({username: user.username});
    } else {
        res.status(403).json({message: 'User not logged in'});
    }
});

router.post("/signup", async (req: Request, res: Response) => {
    const parsedInput = signupProps.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json({
            message: parsedInput.error.issues[0].message
        });
        return;
    }
    const signupParams: SignupParams = {
        username: parsedInput.data.username,
        password: parsedInput.data.password
    };
    const user = await Admin.findOne({username: signupParams.username});
    if (user) {
        res.status(403).json({
            message: "Admin already exists"
        });
    } else {
        const newUser = new User({username: signupParams.username, password: signupParams.password});
        await newUser.save();
        const token = jwt.sign({
            username: newUser._id,
            role: "admin"
        }, SECRET, {
            expiresIn: "1h"
        });
        res.json({message: "Admin created successfully", token});
    }
});

export default router;
