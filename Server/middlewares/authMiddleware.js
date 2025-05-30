const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.authenticate = (req, res, next) =>{
    try{
       let token = req.cookies?.token || req.body?.token ||req.header("Authorization")?.split(" ")[1];
       if(!token){
              return res.status(401).json({
                success:false,
                message:"Token not found",
                error:"Token missing"
              });
       }
     
       const payload = jwt.verify(token, process.env.JWT_SECRET);
          if(!payload){
            return res.status(401).json({
                success:false,
                message:"Token is not valid",
                error:"Token is invalid"
            });
          }
            req.user = payload;
            

            next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to authenticate user",
            error: err.message,
        });
    }
}


