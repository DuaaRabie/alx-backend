import kue from 'kue';

// Create an array with blacklisted phone numbers
const blacklistedNumbers = [
  '4153518780',
  '4153518781',
];

// Create a function to send a notification
function sendNotification(phoneNumber, message, job, done) {
  // Start tracking the progress of the job
  job.progress(0, 100);

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    job.fail(new Error(`Phone number ${phoneNumber} is blacklisted`));
    console.log(`Notification job ${job.id} failed: Phone number ${phoneNumber} is blacklisted`);
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`)); // Fail the job
  }

  // Track the progress to 50%
  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Simulate job completion (normally, you'd send the actual notification)
  setTimeout(() => {
    console.log(`Notification job ${job.id} completed`);
    done(); // Mark the job as completed
  }, 2000); // Simulate delay in sending the notification
}

// Create a queue with Kue
const queue = kue.createQueue({
  // Process jobs in concurrency of 2 (two jobs at a time)
  concurrency: 2
});

// Process jobs in the queue
queue.process('push_notification_code_2', (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
