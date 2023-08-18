import * as jwt from "jsonwebtoken";
import 'dotenv/config';
import {NextFunction, Request, Response} from "express";
import {VerifyErrors} from "jsonwebtoken";

const SECRET = process.env.SECRET || "SECRET";

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }
            req.headers["userId"] = payload.id;
            //req.user = decoded;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export {authenticateJwt, SECRET};