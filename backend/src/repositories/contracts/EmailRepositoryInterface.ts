import Email from "../../models/Email";
import TrackActionEmail from "../../models/TrackActionEmail";

export default interface EmailRepositoryInterface {

    create(email: Email): Promise<any>

    trackClick(trackActionEmail: TrackActionEmail): Promise<any>;

    trackOpen(trackActionEmail: TrackActionEmail): Promise<any>;


}
