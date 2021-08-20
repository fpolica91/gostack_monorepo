import Bee from "bee-queue";
import redisConfig from "../config/redis";

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }
  init() {}
}

export default new Queue();
