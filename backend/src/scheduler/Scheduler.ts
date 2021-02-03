import SchedulerInterface from "./contracts/ScheduleInterface";
import schedule, { JobCallback } from "node-schedule";


export default class Scheduler implements SchedulerInterface {


    register(time: string, action: JobCallback): void {
        schedule.scheduleJob('job', time, action);
    }

}