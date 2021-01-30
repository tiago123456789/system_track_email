import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
    info: {
        title: "System track email",
        version: "1.0.0",
        description: "System allow send email and track click and openning email"
    }
}

const swaggerSpec =  swaggerJsDoc({
    swaggerDefinition: swaggerDefinition,
    // @ts-ignore
    apis: [process.env.SWAGGER_PATH_ROUTES],
});

export default swaggerSpec;