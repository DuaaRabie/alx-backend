import kue from 'kue';

// Define an array of jobs
const jobs = [
  { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
  { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4153518743', message: 'This is the code 4321 to verify your account' },
  { phoneNumber: '4153538781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4153118782', message: 'This is the code 4321 to verify your account' },
  { phoneNumber: '4153718781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4159518782', message: 'This is the code 4321 to verify your account' },
  { phoneNumber: '4158718781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4153818782', message: 'This is the code 4321 to verify your account' },
  { phoneNumber: '4154318781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4151218782', message: 'This is the code 4321 to verify your account' }
];

// Create a queue with Kue
const queue = kue.createQueue();

// Loop through each job in the jobs array
jobs.forEach((jobData) => {
  // Create a job for each entry in the array
  const job = queue.create('push_notification_code_2', jobData)
    .save((err) => {
      if (err) {
        console.log(`Notification job failed: ${err}`);
      } else {
        console.log(`Notification job created: ${job.id}`);
      }
    });

  // Track the progress of the job
  job.on('progress', (progress, data) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });

  // Track when the job is completed
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  });

  // Track when the job fails
  job.on('failed', (errorMessage) => {
    console.log(`Notification job ${job.id} failed: ${errorMessage}`);
  });
});
