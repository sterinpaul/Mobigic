import express from 'express'
import http from 'http'
import cors from 'cors'
import startServer from './config/serverConnection.js'
import mongoDBConnect from './config/dbConnection.js'
import router from './routes/userRouter.js'
import { fileURLToPath } from 'url';
import path,{dirname} from 'path'
const app = express()

// Creating the server
const server = http.createServer(app)

// Setting static files directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enabling CORS
const enableCors = {
  origin: ['https://workplacecodedone.online'],
  // origin: '*',
  exposeHeaders: ['Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy']
}

// Calling app middlewares
app.use(cors(enableCors))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));


// app.use(express.static('./src/public'));
// app.use('/uploads', express.static('uploads'));

// User router middleware
app.use(router)

// Connecting the Atlas database
mongoDBConnect()
// Starting the server
startServer(server)