import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

// Create Express app
const app = express();
const port = 1245;

// Create Redis client and promisify the get and set functions for async usage
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize available seats and reservationEnabled flag
let reservationEnabled = true;
const initialAvailableSeats = 50;

// Set the initial number of available seats in Redis
client.on('connect', async () => {
  await setAsync('available_seats', initialAvailableSeats.toString());
  console.log(`Available seats set to ${initialAvailableSeats}`);
});

// Create Kue queue
const queue = kue.createQueue();

// Function to reserve a seat (decrease available seats in Redis)
async function reserveSeat(number) {
  const currentSeats = await getCurrentAvailableSeats();
  const newSeats = currentSeats - number;
  
  if (newSeats < 0) {
    throw new Error('Not enough seats available');
  }

  await setAsync('available_seats', newSeats.toString());
  return newSeats;
}

// Function to get current available seats from Redis
async function getCurrentAvailableSeats() {
  const availableSeats = await getAsync('available_seats');
  return parseInt(availableSeats, 10);
}

// Route to get available seats
app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats.toString() });
});

// Route to reserve a seat (queue the job if reservationEnabled is true)
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  // Create the reservation job
  const job = queue.create('reserve_seat', {}).save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });
});

// Process the reservation jobs
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  // Process the queue
  queue.process('reserve_seat', async (job, done) => {
    try {
      const currentSeats = await getCurrentAvailableSeats();
      
      // Check if there are enough seats
      if (currentSeats <= 0) {
        reservationEnabled = false; // Disable reservations if no seats are left
        return done(new Error('Not enough seats available'));
      }

      // Reserve a seat
      const newSeats = await reserveSeat(1);

      // If seats are available, mark the job as completed
      if (newSeats >= 0) {
        console.log(`Seat reservation job ${job.id} completed`);
        done();
      }
    } catch (error) {
      // If not enough seats, fail the job
      console.log(`Seat reservation job ${job.id} failed: ${error.message}`);
      done(error);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
