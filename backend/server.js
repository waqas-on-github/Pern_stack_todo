// import npm packages

import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import logger from 'morgan'
import CustomError from './utils/CustomError.js'


// import routers
import { router as indexRouter } from './routes/index.js'
import { router as taskRouter } from './routes/task.route.js'
import { router as userRouter } from './routes/user.route.js'
// create the express app
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)


// mount imported routes
app.use('/', indexRouter)
app.use("/api/v1/task" , taskRouter)
app.use("/api/v1/user" , userRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler middleware 
app.use(function (err, req, res, next) {
  if(err instanceof(CustomError)) {
    // do acc to custom error 
    return res.status(err.code || 500).json({
      sucess:  false,
      error : err.message
    })
  }


 if(err) {


    if(err.name ==="PrismaClientKnownRequestError" || err.name ==="NotFoundError") {

     return  res.json({
         success : false , 
         err:  "prisma error" , 
         message :  err.message ,

     })
    }


  return res.status(err?.code || 500 || 400).json({
    sucess:  false,
    error : err.message
  })
 }

})

export { app }
