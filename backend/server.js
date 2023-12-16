// import npm packages
import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import logger from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'


// import routers
import { router as indexRouter } from './routes/index.js'
import { router as taskRouter } from './routes/task.route.js'
import { router as userRouter } from './routes/user.route.js'
import  {router as trashRouter} from './routes/tarsh.route.js'
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
app.use(cors())


// mount imported routes
app.use('/', indexRouter)
app.use("/api/v1/task" , taskRouter)
app.use("/api/v1/user" , userRouter)
app.use("/api/v1/trash" , trashRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler middleware 
app.use(errorHandler)

export { app }
