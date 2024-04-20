const request = require('supertest');
const app = require('../app');

describe('Authentication API', () => {
    it('should register a new user', async() => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Johny',
                email: 'johny@example.com',
                password: 'password',
                identityType: 'ID Card',
                identityNumber: '1234567890',
                address: '123 Street, City'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data');
    });

    it('should login with correct credentials', async() => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'johny@example.com',
                password: 'password'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data.token');
    });

    it('should return authentication successful', async() => {
        const token = 'valid_token'; // Assuming a valid token for authentication
        const res = await request(app)
            .get('/api/v1/auth/authenticate')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });
});