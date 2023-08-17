import * as jwt from "jsonwebtoken";
import 'dotenv/config';
import {NextFunction, Request, Response} from "express";

const SECRET = process.env.SECRET;

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { authenticateJwt, SECRET };