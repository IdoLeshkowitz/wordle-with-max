import {User} from "../../../../commonTypes/User";
import {getUsersService} from "../../services/users-service";
import {body, query, validationResult} from "express-validator";
import {Router} from "express";
import bodyParser from "body-parser";

export function getUserValidators() {
    const firstNameValidation = body('firstName').isString().isLength({min: 2, max: 20})
    const lastNameValidation = body('lastName').isString().isLength({min: 2, max: 20})
    const emailValidation = body('email').isEmail()
    return [firstNameValidation, lastNameValidation, emailValidation]
}
export function getEmailValidators() {
    return query('email').isEmail()
}
const protect = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}
async function createUser(req, res) {
    const userToBeCreated: User = req.body
    const createdUser = await getUsersService().create(userToBeCreated)
    res.send(createdUser)
}
async function getUserByEmail(req, res) {
    const { email } = req.query
    if (!email) {
        res.status(404).send('Email not found')
        return
    }
    const user = await getUsersService().one(email)
    if (!user) {
        res.status(404).send('User not found')
        return
    }
    res.send(user)
}
const usersRouter = Router()
usersRouter.post('/', bodyParser.json(), getUserValidators(), protect, createUser)
usersRouter.get('/',bodyParser.urlencoded({extended:true}),getEmailValidators(),protect,getUserByEmail)
export default usersRouter
