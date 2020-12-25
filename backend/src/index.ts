import app from "./config/Server";

app.listen(process.env.PORT, (): void => {
    console.log("The server is running in address: http://localhost:3000")
})