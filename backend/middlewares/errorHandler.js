import CustomError from "../utils/CustomError.js";

const errorHandler = (err, req, res, next) => {
  console.error('Error message:', err.message); // Log the error message
  
  if (err instanceof CustomError) {
    // do acc to custom error  
    console.log(err);
    return res.status(500).json({
      sucess: false,
      error: err.message,
    });
  }

  if (err) {
    console.log(err);
    if (
      err.name === "PrismaClientKnownRequestError" || 
      err.name === "NotFoundError"
      
      ) {
      return res.status(500).json({
        success: false,
        err:  "prisma error",
        message: err.message,
        stack :  err.stack
      });
    }
     
    // console.log(err.stack);
    return res.status(err?.code || 500).json({
      sucess: false,
      error: err.message,
      stack: err.stack,
    });
  }
};

export { errorHandler };
