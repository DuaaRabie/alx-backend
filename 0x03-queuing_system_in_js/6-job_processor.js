import kue from 'kue';

// Create a job queue
const queue = kue.createQueue();

// Function to send the notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Set up the queue process for push_notification_code
queue.process('push_notification_code', (job, done) => {
  // Extract phone number and message from the job
  const { phoneNumber, message } = job.data;

  // Call sendNotification function
  sendNotification(phoneNumber, message);

  // Indicate that the job is completed
  done();
});
