const request = require('supertest');
const app = require('../app');

describe('Account API', () => {
    it('should create a new account', async() => {
        const res = await request(app)
            .post('/api/v1/accounts')
            .send({
                userId: 1,
                bankName: 'Example Bank',
                bankAccountNumber: '1234567890',
                balance: 1000
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });


    it('should get all accounts', async() => {
        const res = await request(app).get('/api/v1/accounts');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy(); // Update assertion to check if the response body is an array
    });

    it('should get account by ID', async() => {
        const res = await request(app).get('/api/v1/accounts/1'); // Assuming account with ID 1 exists
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
    });
});