const ErrorHander = require('../utils/errorHander')


module.exports = (err,req,res,next)=>{
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal Server Error";
  // wrong mongodb Id Error
  if(err.name==='CastError'){
       const message = `Resource not Found. Invalid: ${err.path}`
       err = new ErrorHander(message,400)
  }
  // mongoose duplicate key Error
  if (err.code ===11000){
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
      err = new ErrorHander(message,400)
  }
  // wrong JWT token
  if(err.name==='JsonWebTokenError'){
    const message = `Json web token is invalid,Try again`
    err = new ErrorHander(message,400)
   }
  // JWT expire Error
  if(err.name==='tokenExpiredError'){
    const message = `Json web token is Expired,Try again`
    err = new ErrorHander(message,400)
   }
   res.status(err.statusCode).json({
       success:false,
       message:err.message
   })
} 