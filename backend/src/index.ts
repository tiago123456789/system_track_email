import app from "./config/Server";

app.listen(process.env.PORT, (): void => {
    console.log(`The server is running in address: ${process.env.APP_URL}`)
})