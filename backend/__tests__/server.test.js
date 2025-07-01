const request = require('supertest');
const app = require('../app');

describe('Medicine Tracker API', () => {
  it('GET /health should return 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('OK');
  });

  it('GET /medicines should return an array (initially empty or seeded)', async () => {
    const res = await request(app).get('/medicines');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /medicines should add a medicine and return it', async () => {
    const medicine = {
      name: 'Paracetamol',
      expiryDate: '2026-12-31'
    };

    const res = await request(app)
      .post('/medicines')
      .send(medicine);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(medicine.name);
    expect(res.body.expiryDate).toBe(medicine.expiryDate);
  });

  it('PUT /medicines/:id should update a medicine', async () => {
    const postRes = await request(app).post('/medicines').send({
      name: 'Ibuprofen',
      expiryDate: '2025-11-11',
    });

    const id = postRes.body.id;

    const putRes = await request(app)
      .put(`/medicines/${id}`)
      .send({ name: 'Ibuprofen Updated', expiryDate: '2027-01-01' });

    expect(putRes.statusCode).toBe(200);
    expect(putRes.body.name).toBe('Ibuprofen Updated');
  });

  it('DELETE /medicines/:id should delete a medicine', async () => {
    const postRes = await request(app).post('/medicines').send({
      name: 'DeleteMe',
      expiryDate: '2025-09-09',
    });

    const id = postRes.body.id;

    const delRes = await request(app).delete(`/medicines/${id}`);
    expect(delRes.statusCode).toBe(204);
  });
});
