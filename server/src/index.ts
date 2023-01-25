// @ts-ignore
import express, {Request, Response} from "express";
import * as bodyParser from "body-parser";
import {evaluateWord} from "./evaluateWord";

interface GameSession {
    id : number ;
    word : string ;
}
const port = 5555;
const words: string[] = ['MELON','WRONG','COULD'];
const gameSessions: GameSession[] = [];
export const app = express();

app.use(bodyParser.json());

app.get('/startgame', (req:Request, res:Response) => {
    const userId = req.query.userId;
    const gameSession : GameSession = {
        id: gameSessions.length + 1,
        word : words[Math.floor(Math.random() * words.length)]
    }
    gameSessions.push(gameSession);
    res.send(JSON.stringify(gameSession.id));
})

app.post('/send', (req: Request, res: Response) => {
    const result = req.body;
    const answer = evaluateWord(word, req.body);
    res.send(answer);
});
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});