import configKeys from "./envConfig.js";

const startServer = (app)=>{
    const port = parseInt(configKeys.PORT,10)
    app.listen(port,'0.0.0.0',()=>{
        console.log(`Server started on http://localhost:${configKeys.PORT}`);
    })
}
export default startServer