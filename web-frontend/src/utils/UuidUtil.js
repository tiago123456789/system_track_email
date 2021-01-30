import { v4 as uuid } from "uuid";


class UuidUtil {

    static get() {
        return uuid()
    }

}

export default UuidUtil;