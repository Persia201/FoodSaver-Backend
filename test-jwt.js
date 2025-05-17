const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = jwt.sign({ id: '64f...' }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

console.log('Generated Token:', token);

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Decoded Token:', decoded);
} catch (err) {
  console.error('Verification failed:', err.message);
}