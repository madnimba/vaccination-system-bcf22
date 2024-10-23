const request = require('supertest');
const { app, connectToDatabase } = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

// Connect to a test database before running the tests
beforeAll(async () => {
  await connectToDatabase();  // Use the same connection method
});

// Clean up the test database after each test
afterEach(async () => {
  await User.deleteMany();
});

// Close the database after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/users', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        address: '123 Main St',
        n_id: '123456789',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('newUser');
  });

  it('should not register a user with the same n_id', async () => {
    // Register a user
    await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        address: '123 Main St',
        n_id: '123456789',
      });

    // Try to register another user with the same n_id
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Jane Doe',
        address: '456 Another St',
        n_id: '123456789',
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('message');
  });
});
