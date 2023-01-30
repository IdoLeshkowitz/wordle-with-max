import {User} from "../../../../commonTypes/User";
import {getUsersService} from "../../services/users-service";
import {body, validationResult} from "express-validator";
import {Router} from "express";
import bodyParser from "body-parser";
import {createJWT} from "../../services/auth-service";

export function getUserValidators() {
    const firstNameValidation = body('firstName').isString().isLength({min: 2, max: 20})
    const lastNameValidation = body('lastName').isString().isLength({min: 2, max: 20})
    const emailValidation = body('email').isEmail()
    return [firstNameValidation, lastNameValidation, emailValidation]
}
const protect = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}
async function createUser(req, res) {
    function cleanUser(user:User){
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
    }
    const userToBeCreated: User = req.body
    try {
        const createdUser = await getUsersService().create(userToBeCreated)
        res.send({token: createJWT(cleanUser(createdUser))})
    }catch(e) {
        res.status(400).send({message : 'unable to sign up'})
        return
    }
}
const usersRouter = Router()
usersRouter.post('/', bodyParser.json(), getUserValidators(), protect, createUser)
export default usersRouter
