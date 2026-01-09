const request = require('supertest');

// Mock Database Connection
jest.mock('../config/db', () => ({
    connectDB: jest.fn()
}));

const app = require('../index');

describe('Backend Sanity Check', () => {
    it('should return 200 OK for root route', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('VyapaarSaarthi API Running');
    });
});
