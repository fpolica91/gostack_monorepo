import Bee from "bee-queue";
import CancellationMail from "../app/jobs/cancellationMail";
import redisConfig from "../config/redis";
const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }
  init() {
    // we are saving all the jobs inside of queues
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig
        }),
        handle
      };
    });
  }
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      // bee.process(handle);
      // if there is no error process
      bee.on("failed", this.handleFailure).process(handle);
    });
  }
  // in case there is a failure, receives, job and error
  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
