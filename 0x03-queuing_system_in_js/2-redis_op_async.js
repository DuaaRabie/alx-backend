// Import the redis library
import redis from 'redis';
import { promisify } from 'util';

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

// Promisify the client.get method for async/await usage
const getAsync = promisify(client.get).bind(client);

// Function to set a new school with a value
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);  // Use redis.print to print confirmation
}

// Async function to display the value of a school
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);  // Use async/await to get the value
    console.log(value);  // Output the value of the key
  } catch (err) {
    console.log(err);  // Handle errors if any occur during the async operation
  }
}

// Call the functions as per the task
displaySchoolValue('Holberton');  // This will return "School" if it's set
setNewSchool('HolbertonSanFrancisco', '100');  // Set a new value for the key 'HolbertonSanFrancisco'
displaySchoolValue('HolbertonSanFrancisco');  // This will return '100'
