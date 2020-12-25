import * as bcrypt from "bcryptjs";

class Encrypter {

    readonly SALT_LENGTH: number = 10;

    getHash(value: string): Promise<string> {
        return bcrypt.hash(value, this.SALT_LENGTH);
    } 

    compare(value: string, hash: string ): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }
}

export default Encrypter;