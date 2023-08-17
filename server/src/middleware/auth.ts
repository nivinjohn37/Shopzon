import * as jwt from "jsonwebtoken";
import 'dotenv/config';
import {NextFunction, Request, Response} from "express";

const SECRET = process.env.SECRET;
// Define an interface that extends the Request interface
interface CustomRequest extends Request {
    user?: any; // Change 'any' to the actual type of 'user' if known
}

const authenticateJwt = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = decoded;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export { authenticateJwt, SECRET, CustomRequest };