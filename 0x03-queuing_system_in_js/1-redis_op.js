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

// Function to set a new school with a value
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);  // Use redis.print to print confirmation
}

// Function to display the value of a school
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.log(err);
    } else {
      console.log(reply);  // Output the value of the key
    }
  });
}

// Call the functions as per the task
displaySchoolValue('Holberton');  // This will return "School" if it's set
setNewSchool('HolbertonSanFrancisco', '100');  // Set a new value for the key 'HolbertonSanFrancisco'
displaySchoolValue('HolbertonSanFrancisco');  // This will return '100'
