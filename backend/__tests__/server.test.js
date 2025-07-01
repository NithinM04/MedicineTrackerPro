const request = require('supertest');
const app = require('../app');

describe('Medicine Tracker API', () => {
  let token = '';
  let medicineId = null;

  beforeAll(async () => {
    // Register a new user
    const registerRes = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    });

    token = registerRes.body.token;
  });

  it('GET /api/health should return 200 OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  it('GET /api/medicines should return an array', async () => {
    const res = await request(app)
      .get('/api/medicines')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.medicines)).toBe(true);
  });

  it('POST /api/medicines should add a medicine and return it', async () => {
    const medicine = {
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: 'daily',
      start_date: '2025-07-01',
    };

    const res = await request(app)
      .post('/api/medicines')
      .set('Authorization', `Bearer ${token}`)
      .send(medicine);

    expect(res.statusCode).toBe(201);
    expect(res.body.medicine).toHaveProperty('id');
    expect(res.body.medicine.name).toBe(medicine.name);

    medicineId = res.body.medicine.id;
  });

  it('PUT /api/medicines/:id should update a medicine', async () => {
    const res = await request(app)
      .put(`/api/medicines/${medicineId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Paracetamol Updated' });

    expect(res.statusCode).toBe(200);
  });

  it('DELETE /api/medicines/:id should delete a medicine', async () => {
    const res = await request(app)
      .delete(`/api/medicines/${medicineId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
