import {Router} from "express";
import {getUsersService} from "../../services/users-service";
import {comparePassword, createJWT} from "../../services/auth-service";
import {OAuth2Client} from "google-auth-library";
import bodyParser from "body-parser";
import {ErrorType} from "../../../../commonTypes/Errors";

const GOOGLE_CLIENT_ID = '1053600571463-0bq8ik99to3hlq78e8ao7rdkcasmo3qn.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function login(email, password) {
    let user
    try {
        user = await getUsersService().one(email);
    } catch (e) {
        throw new Error(ErrorType.LOGIN_ERROR)
    }
    const authenticated = comparePassword(password, user.password)
    if (!authenticated) {
        throw new Error(ErrorType.LOGIN_ERROR)
    }
    return user;
}
async function googleLogin(token) {
    try {
        const ticket = await client.verifyIdToken({idToken: token, audience: GOOGLE_CLIENT_ID});
        return ticket.getPayload();
    } catch (e) {
        throw new Error('Invalid token')
    }
}
const authRouter = Router();
authRouter.post('/login', bodyParser.json(), async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await login(email, password)
        res.send({token: createJWT(user)})
    } catch (e) {
        res.status(401).send({message: e.message});
    }
})
authRouter.post('/loginwithgoogle', bodyParser.json(), async (req, res) => {
    const token = req.headers.authorization;
    try {
        const {email, given_name: firstName, family_name: lastName} = await googleLogin(token)
        res.send({token: createJWT({email, firstName, lastName})})
    } catch (e) {
        res.status(401).send(e.message)
    }
});

export default authRouter