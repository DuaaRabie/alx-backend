import kue from 'kue';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  // Set up a queue before each test
  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode = true; // Enable test mode to avoid processing jobs
  });

  // Clean up the queue after each test
  afterEach(() => {
    queue.testMode = false; // Disable test mode
    queue.removeCompleted(); // Clear the queue
    queue.removeFailed(); // Remove failed jobs if any
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 5678 to verify your account'
      }
    ];

    createPushNotificationsJobs(jobs, queue);

    // Validate that jobs have been added to the queue
    const jobIds = queue.testMode.jobs.map(job => job.id);
    expect(jobIds).to.have.lengthOf(2); // Two jobs should be created
    expect(jobIds[0]).to.be.a('number'); // Job IDs should be numbers
  });

  it('should correctly log when jobs are created', (done) => {
    const jobs = [
      {
        phoneNumber: '4153518782',
        message: 'This is the code 1234 to verify your account'
      }
    ];

    // Listen to console logs
    const logSpy = sinon.spy(console, 'log');

    createPushNotificationsJobs(jobs, queue);

    // Wait for a short time to ensure the job creation log occurs
    setTimeout(() => {
      expect(logSpy.calledWith('Notification job created: 1')).to.be.true;
      logSpy.restore();
      done();
    }, 100);
  });
});
