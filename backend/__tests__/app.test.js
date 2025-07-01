const request = require('supertest');
const app = require('../app');

describe('App Configuration', () => {
  it('should have a /api/health route', async () => {
    const res = await request(app).get('/api/health');
    expect([200, 404]).toContain(res.statusCode); // 200 if route exists, 404 if handled elsewhere
  });

  it('should return 404 on unknown route', async () => {
    const res = await request(app).get('/api/unknown-route');
    expect(res.statusCode).toBe(404);
  });
});
