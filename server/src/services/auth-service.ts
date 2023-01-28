import {User} from "../../../commonTypes/User";
import jwt, {JwtPayload} from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const JWT_KEY = 'secret'

export function createJWT(user: User) {
    return jwt.sign(user, JWT_KEY)
}
export function verifyJWT<T=JwtPayload>(token: string) :T{
    return jwt.verify(token, JWT_KEY) as T
}
export function hashPassword(password: string) : Promise<string> {
 return bcrypt.has(password, 10)
}

export function comparePassword(password: string, hash: string) : Promise<boolean> {
    return bcrypt.compare(password, hash)
}