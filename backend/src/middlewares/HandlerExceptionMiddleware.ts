import { NextFunction, Response, Request } from "express";
import logger from "../config/Logger";

export default (error: Error, request: Request, response: Response, next: NextFunction) => {

    switch (error.name) {
        case "UnAuthorizated":
            logger.info(error.message);
            return response.status(401).json({
                statusCode: 401,
                message: error.message
            });
        case "NotFoundException":
            logger.info(error.message);
            return response.status(404).json({
                statusCode: 404,
                message: error.message
            });
        case "BusinessLogicException":
            logger.info(error.message);
            return response.status(409).json({
                statusCode: 409,
                message: error.message
            });
        case "InvalidDatasException":
            logger.info(error.message);
            return response.status(400).json({
                statusCode: 400,
                message: JSON.parse(error.message)
            });
        case "ForbiddenException":
            logger.info(error.message);
            return response.status(403).json({
                statusCode: 403,
                message: error.message
            });
        default:
            logger.error(error.message);
            return response.status(500).json({
                statusCode: 500,
                message: error.message
            });
    }
}