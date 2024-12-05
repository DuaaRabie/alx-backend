import redis from 'redis';

// Create the Redis client for the subscriber
const subscriber = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

// Handle connection and error events
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Subscribe to the "holberton school channel"
subscriber.subscribe('holberton school channel');

// Listen for messages on the subscribed channel
subscriber.on('message', (channel, message) => {
  console.log(`Received message: ${message}`);

  // If the message is "KILL_SERVER", unsubscribe and quit
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
