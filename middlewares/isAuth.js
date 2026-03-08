// import jwt from "jsonwebtoken"
// const isAuth = async(req,res,next)=>{
//     try {
//         let token = req.cookies.token
//         if(!token){
//             return res.status(400).json({message:"user does not have a token"})
//         }
//         const verifyToken = jwt.verify(token , process.env.JWT_SECRET)

//         if(!verifyToken){
//             return res.status(400).json({message:"user does not have a token"})
//         }
//         req.userId = verifyToken.userId

//         next()
//     } catch (error) {
//         return res.status(500).json({message:`Is auth error ${error}`})
//     }
// }
// export default isAuth;
import jwt from "jsonwebtoken"

const isAuth = async (req,res,next)=>{
    try {

        const token = req.cookies.token

        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        req.userId = decoded.id || decoded.userId

        next()

    } catch (error) {
        return res.status(401).json({message:`Auth error ${error.message}`})
    }
}

export default isAuth;