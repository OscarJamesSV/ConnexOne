import supertest from 'supertest';
import app from '../src/app';

describe('API endpoints', () => {
  it('/time should return current time in epoch seconds', async () => {
    const response = await supertest(app)
      .get('/time')
      .set('Authorization', 'mysecrettoken');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('epoch');
    expect(typeof response.body.epoch).toBe('number');
  });

  // doesn't work with prometheus middleware....
  it('/metrics should return metrics', async () => {
    const response = await supertest(app).get('/metrics');
    expect(response.status).toBe(200);
  });

  it('non-existing route should return 404', async () => {
    const response = await supertest(app).get('/non-existing-route');
    expect(response.status).toBe(404);
  });

  it('/time should return 403 Forbidden for invalid authorization', async () => {
    const response = await supertest(app)
      .get('/time')
      .set('Authorization', 'invalidtoken');
    expect(response.status).toBe(403);
  });
});
