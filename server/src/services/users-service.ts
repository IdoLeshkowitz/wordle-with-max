import { User } from "../../../commonTypes/User";

const usersData: User[] = [
    {email:'example@gmail.com',lastName:'example',firstName:'example',password:'example'}
];
export class UsersService {
    constructor(private readonly users: User[] = usersData) {
    }
    async create(user: User): Promise<User> {
        usersData.push(user)
        return user
    }
    async one(email: string): Promise<User> {
        const user = usersData.find(user => user.email === email)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }
}

let usersService: UsersService;
export function getUsersService(): UsersService {
    if (!usersService) {
        usersService = new UsersService()
    }
    return usersService
}