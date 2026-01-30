const request = require('supertest');

require('dotenv').config();
 
const BASE_URL = `http://localhost:3000`;
 
describe('register test', () => {

  it('should create a new user', async () => {

    const uniqueUsername = `testuser${Date.now()}`;

    const uniqueEmail = `unique${Date.now()}@gmail.com`;
 
    const res = await request(BASE_URL)

      .post('/api/auth/register')

      .send({

        username: uniqueUsername,

        email: uniqueEmail,

        password: 'securepassword123'

      });
 
    expect(res.body.success).toBe(true);

    expect(res.body.message).toBe('User added successfully');

    expect(res.body.user.email).toBe(uniqueEmail);

  });
 
  it('should return success false for missing fields', async () => {

    const res = await request(BASE_URL)

      .post('/api/auth/register')

      .send({

        email: 'unique@gmail.com'

      });
 
    expect(res.body.success).toBe(false);

    expect(res.body.message).toBe('All fields are required');

  });
 
  it('should return error if username already exists', async () => {

    const username = `existing_${Date.now()}`;
 
    await request(BASE_URL)

      .post('/api/auth/register')

      .send({

        username,

        email: `${Date.now()}@example.com`,

        password: 'password123'

      });
 
    const res = await request(BASE_URL)

      .post('/api/auth/register')

      .send({

        username,

        email: `${Date.now()}new@example.com`,

        password: 'password123'

      });
 
    expect(res.body.success).toBe(false);

  });
 
});

