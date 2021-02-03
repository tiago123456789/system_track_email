import connection from "../config/Database"
import Email from "../models/Email";
import TrackActionEmail from "../models/TrackActionEmail";
import EmailRepositoryInterface from "./contracts/EmailRepositoryInterface";
import StatusScheduleEmail from "../models/StatusScheduleEmail";
import moment from "moment";

export default class EmailRepository implements EmailRepositoryInterface {

    async findById(id: Number): Promise<any> {
        const register = await connection("emails").where("id", id).select();
        return register[0] ?? null
    }

    updateEmailScheduleded(id: string, status: string): Promise<any> {
        return  connection("schedule_emails").where("id", id).update({ status });
    }

    scheduleEmail(email: Email): Promise<any> {
        // @ts-ignore
        email.scheduledAt = moment(email.scheduledAt).utc().format('YYYY-MM-DD h:mm:ss');
        return  connection("schedule_emails").insert({
            email_id: email.id,
            status: StatusScheduleEmail.PENDENT,
            scheduled_at: email.scheduledAt
        });
    }

    getEmailsSchedulededs(): Promise<any> {
        const currentDate = moment().utc().subtract(10, "minutes").toDate();
        return  connection("schedule_emails")
                        .where('scheduled_at', ">", currentDate)
                        .where("status", StatusScheduleEmail.PENDENT)
                        .select();
                        
    }

    getActionsTrackByEmailId(emailId: Number): Promise<any> {
        return connection("actions_tracked").where("email_id", emailId).select();
    }

    getAllByUserId(userId: Number): Promise<any> {
        return connection("emails").where("user_id", userId).select();
    }

    trackOpen(trackActionEmail: TrackActionEmail): Promise<any> {
        return connection("actions_tracked").insert({
            email_id: trackActionEmail.emailId,
            to: trackActionEmail.to,
            actions: "open",
        });
    }

    trackClick(trackActionEmail: TrackActionEmail): Promise<any> {
        return connection("actions_tracked").insert({
            email_id: trackActionEmail.emailId,
            actions: "click",
            to: trackActionEmail.to,
            link: trackActionEmail.link
        });
    }
    

    create(email: Email): Promise<any> {
        return connection("emails").insert({
            subject: email.subject,
            from: email.from,
            to: email.to,
            body: email.body,
            user_id: email.userId
        });
    }

}
