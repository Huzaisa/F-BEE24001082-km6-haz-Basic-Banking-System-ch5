const request = require('supertest');
const app = require('../app');

describe('User API', () => {
    it('should create a new user', async() => {
        const res = await request(app)
            .post('/api/v1/users')
            .send({
                name: 'Jane',
                email: 'jane@example.com',
                password: 'password',
                profile: {
                    identityType: 'Passport',
                    identityNumber: '0987654321',
                    address: '456 Avenue, Town'
                }
            });
        expect(res.statusCode).toEqual(201); // Update status code to expect 201 for successful creation
        expect(res.body).toHaveProperty('id');
    });

    it('should get all users', async() => {
        const res = await request(app).get('/api/v1/users');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy(); // Update assertion to check if the response body is an array
    });

    it('should get user by ID', async() => {
        const res = await request(app).get('/api/v1/users/1'); // Assuming user with ID 1 exists
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
    });
});