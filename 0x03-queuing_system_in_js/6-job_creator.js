import kue from 'kue';

// Create a job queue
const queue = kue.createQueue();

// Create an object containing job data
const jobData = {
  phoneNumber: '123-456-7890', // Replace with the actual phone number
  message: 'This is a test notification' // Replace with the actual message
};

// Create a new job in the 'push_notification_code' queue
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (err) {
      console.log('Notification job failed');
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

// Listen for job completion
job.on('complete', () => {
  console.log('Notification job completed');
});

// Listen for job failure
job.on('failed', (errorMessage) => {
  console.log('Notification job failed');
  console.log(`Error: ${errorMessage}`);
});
