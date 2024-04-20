const request = require('supertest');
const app = require('../app');

describe('Transaction API', () => {
    it('should create a new transaction', async() => {
        const res = await request(app)
            .post('/api/v1/transactions')
            .send({
                sourceAccountId: 1,
                destinationAccountId: 2,
                amount: 500
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all transactions', async() => {
        const res = await request(app).get('/api/v1/transactions');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should get transaction by ID', async() => {
        const res = await request(app).get('/api/v1/transactions/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
    });
});