const axios = require('axios');

async function testRegistration() {
  try {
    console.log('Testing user registration...');
    
    // Test registration
    const response = await axios.post('http://localhost:3000/api/user/register', {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Registration response:', response.data);
    
    // Check if user was created
    const loginResponse = await axios.post('http://localhost:3000/api/user/loginUser', {
      email: 'test@example.com',
      password: 'testpassword123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Login response:', loginResponse.data);
    
  } catch (error) {
    if (error.response) {
      console.log('Error response:', error.response.data);
      console.log('Status:', error.response.status);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testRegistration();