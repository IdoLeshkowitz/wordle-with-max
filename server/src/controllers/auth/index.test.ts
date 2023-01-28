import app from "../../app";
import request from "supertest";

describe('signinwithgoogle', () => {
    it('should return 200 when token is valid', async () => {
        const validToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmYzRmYmE2NTk5ZmY1Zj…6aIFcrRNubez28xl64EvXDJXK6P4BXZjLBPE0cR69rNoycs_A"
        const response = await request(app).post('/auth/loginwithgoogle').send({token: validToken})
        expect(response.status).toBe(200)
    })
});