import Token from "../security/Token";
import TokenInterface from "../security/contracts/TokenInterface";
import FactoryInterface from "./FactoryInterface";

class TokenFactory implements FactoryInterface<TokenInterface> {

    make(values: { [key: string]: any; }): TokenInterface {
        return new Token();
    }

}

export default TokenFactory;

