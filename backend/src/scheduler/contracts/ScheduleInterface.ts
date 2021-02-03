import { JobCallback } from "node-schedule";

export default interface SchedulerInterface {

    register(time: string, action: JobCallback): void;
}