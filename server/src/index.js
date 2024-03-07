import express from 'express'
import http from 'http'
import cors from 'cors'
import startServer from './config/serverConnection.js'
import mongoDBConnect from './config/dbConnection.js'
import router from './routes/userRouter.js'

const app = express()

// Creating the server
const server = http.createServer(app)

// Enabling CORS
const enableCors = {
  origin: ['https://workplacecodedone.online'],
  exposeHeaders: ['Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy']
}

// Calling app middlewares
app.use(cors(enableCors))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./src/public'));
app.use('/uploads', express.static('uploads'));

// User router middleware
app.use(router)

// Connecting the Atlas database
mongoDBConnect()
// Starting the server
startServer(server)