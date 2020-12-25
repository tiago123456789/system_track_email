import TokenPayload from "../../models/TokenPayload";

export default interface TokenInterface {

    build(datas: TokenPayload): string;

    isValid(token: string): Promise<any>;

    getValueInPayload(key: string, token: string): Promise<any>;
}