export interface Session {
    id?: string;
    word: string;
    userId: string;
}

const sessionsData: Session[] = [
    {id: '0', word: 'HUMAN', userId: '1'},
]

export class SessionService {
    constructor(private readonly sessions: Session[] = sessionsData) {
    }

    async create(session: Session): Promise<Session> {
        session.id = (sessionsData.length + 1).toString()
        sessionsData.push(session)
        return session
    }
    async one(sessionId: string): Promise<Session> {
        const session = sessionsData.find(session => session.id === sessionId)
        if (!session) {
            throw new Error('Session not found')
        }
        return session
    }
    async all(): Promise<Session[]> {
        return sessionsData
    }
}
let sessionService: SessionService;
export function getSessionService(): SessionService {
    if (!sessionService) {
        sessionService = new SessionService()
    }
    return sessionService
}