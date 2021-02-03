import Email from "../../models/Email";
import TrackActionEmail from "../../models/TrackActionEmail";

export default interface EmailRepositoryInterface {

    updateEmailScheduleded(id: string, status: string): Promise<any>;
    
    create(email: Email): Promise<any>

    scheduleEmail(email: Email): Promise<any>;

    getEmailsSchedulededs(): Promise<any>;

    trackClick(trackActionEmail: TrackActionEmail): Promise<any>;

    trackOpen(trackActionEmail: TrackActionEmail): Promise<any>;

    getAllByUserId(userId: Number): Promise<any>;

    getActionsTrackByEmailId(emailId: Number): Promise<any>;

    findById(id: Number): Promise<any>; 
}
