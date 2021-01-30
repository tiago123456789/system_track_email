import sdk from "aws-sdk";

export default abstract class Queueu {

    protected queue: any;

    constructor() {
        sdk.config.update({
            region: process.env.REGION
        });
        this.queue = new sdk.SQS();
    }

}