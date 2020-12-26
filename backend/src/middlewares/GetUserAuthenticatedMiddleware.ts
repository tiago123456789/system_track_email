import { NextFunction, Request, Response } from "express";
import CONSTANTES from "../config/Constantes";
import TokenFactory from "../factories/TokenFactory";

const token = new TokenFactory().make({});

export default async (request: Request, response: Response, next: NextFunction) => {
    let accessToken: any = request.headers[CONSTANTES.HEADER_PARAM_AUTHORIZATION];
    if (accessToken) {
        accessToken = accessToken.replace(CONSTANTES.HEADER_PREFIX_TOKEN_PARAM, "");
        const userId = await token.getValueInPayload("id", accessToken);
        // @ts-ignore
        request.userId = userId;
        next();
    } else {
        next();
    }
}