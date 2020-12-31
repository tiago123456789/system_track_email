import { v4 } from "uuid";

export default class Uuid {

    get(): string {
        return v4();
    }
}