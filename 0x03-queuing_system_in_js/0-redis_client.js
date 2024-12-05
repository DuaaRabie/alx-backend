// Import the redis library
import redis from 'redis';

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1',  // Address of Redis server
  port: 6379          // Default Redis port
});

// Listen for the connection event
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Listen for error events
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});
