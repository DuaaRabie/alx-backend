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

// Create a hash with the provided values
function createHash() {
  client.hset('HolbertonSchools', 'Portland', 50, redis.print);
  client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
  client.hset('HolbertonSchools', 'New York', 20, redis.print);
  client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
  client.hset('HolbertonSchools', 'Cali', 40, redis.print);
  client.hset('HolbertonSchools', 'Paris', 2, redis.print);
}

// Display the hash stored in Redis
function displayHash() {
  client.hgetall('HolbertonSchools', (err, object) => {
    if (err) {
      console.log('Error retrieving hash:', err);
    } else {
      console.log(object);  // Log the full hash object
    }
  });
}

// Call the functions to store and display the hash
createHash();
displayHash();
