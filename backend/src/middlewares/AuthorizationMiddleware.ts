import { Request, Response, NextFunction } from "express";
import JwtAuthFactory from "../factories/JwtAuthFactory";
import TokenFactory from "../factories/TokenFactory";
import CONSTANTES from "../config/Constantes";

const auth = new JwtAuthFactory().make({});
const token = new TokenFactory().make({});

export default {

    hasPermission(permissionsNecessary = []) {
        return async (request: Request, response: Response, next: NextFunction) => {
            try {
                let accessToken: any = request.headers[CONSTANTES.HEADER_PARAM_AUTHORIZATION];

                if (!accessToken)  {
                    return response.status(401)
                    .json({ msg: "Is necessary informate token in header request!" });
                }
    
                accessToken = accessToken.replace(CONSTANTES.HEADER_PREFIX_TOKEN_PARAM, "");

                await token.isValid(accessToken);
                const roles = await token.getValueInPayload("roles", accessToken);
                const isHasAccessResource = auth.hasPermission(permissionsNecessary, roles);

                if (!isHasAccessResource) {
                    return response.status(403)
                    .json({ msg: "You don't access to the resources!" });
                }

                next();
            } catch(error) {
                return response.status(401)
                .json({ msg: "Token informated is invalid!" });
            }
        }
    }
}