import authService from "./authMiddlewares.js";

const authTokenMiddleware = (req,res,next)=>{
    let token = null
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token = req.headers.authorization.split(" ")[1];
    }
    try{
        if(typeof token === "string"){
            const response = authService.verifyToken(token)
            if(response){
                next()
            } else {
                res.status(400).json({ message: "Unauthorized" })
            }
        }
    }catch(error){
        res.status(400).json({ message: "Token expired" })
    }
}

export default authTokenMiddleware