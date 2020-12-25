import TokenPayload from "../models/TokenPayload";
import TokenInterface from "./contracts/TokenInterface";
import jwt from "jsonwebtoken";


export default class Token implements TokenInterface {

    build(datas: TokenPayload): string {
        return jwt.sign({
            id: datas.id,
            name: datas.name,
            email: datas.email, 
            permissions: datas.permissions
            //@ts-ignore    
        }, process.env.SECRET, { expiresIn: process.env.EXPIRATION_TIME });
    }

    isValid(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            return jwt.verify(token, process.env.SECRET, function (err, decoded) {
                if (err) {
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    getValueInPayload(key: string, token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            jwt.verify(token, process.env.SECRET, function (err, decoded) {
                if (err) reject(null);

                //@ts-ignore
                const value = decoded[key] || null;
                resolve(value);
            });
        });
    }

}