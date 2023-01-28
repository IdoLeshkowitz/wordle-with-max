import {getUserValidators} from "./index";
import app from "../../app";
import request from "supertest";

describe('POST /user', () => {
    it('should return 400 when firstName is missing', async () => {
        const user = {
            lastName: 'Doe', email: 'email@gmail.com',
        }
        const response = await request(app).post('/user').send(user)
        expect(response.status).toBe(400)

    })
    it('should return 400 when lastName is missing', async () => {
        const user = {
            firstName: 'John', email: 'email@gmail.com',
        }
        const response = await request(app).post('/user').send(user)
        expect(response.status).toBe(400)
    })
    it('should return 400 when email is missing', async () => {
        const user = {
            firstName: 'John', lastName: 'Doe',
        }
        const response = await request(app).post('/user').send(user)
        expect(response.status).toBe(400)
    })
    it('should return 400 when email is invalid', async () => {
        const user = {
            firstName: 'John', lastName: 'Doe', email: 'email',
        }
        const response = await request(app).post('/user').send(user)
        expect(response.status).toBe(400)
    })
    it('should return 200 when firstName, lastName and email are valid', async () => {
        const user = {
            firstName: 'John', lastName: 'Doe', email: 'email@gmail.com',}
        const response = await request(app).post('/user').send(user)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(user)
    });
})

describe ('creating user and getting user by email', () => {
    it('should return the user when email is valid', async () => {
        const user = {
            firstName: 'John', lastName: 'Doe', email: 'email@gmail.com'}
        const response = await request(app).post('/user').send(user)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(user)
        const response2 = await request(app).get('/user/?email=email@gmail.com')
        expect(response2.status).toBe(200)
        expect(response2.body).toEqual(user)
    })
})

describe('GET /user', () => {
    it('should return 400 when email is missing', async () => {
        const response = await request(app).get('/user')
        expect(response.status).toBe(400)
    })
})
