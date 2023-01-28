import {Response, Request, NextFunction} from "express";
import {User} from "../../../commonTypes/User";
import {verifyJWT} from "../services/auth-service";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization
    if (!token) {
        return res.status
    }

    try {
        const user: User = verifyJWT(token)
        req.headers.email = user.email;
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized');
    }
}

export default authMiddleware;