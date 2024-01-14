import express from 'express'
import userControllers from '../controllers/userControllers.js'
import { uploads } from '../middlewares/multer.js'
import authTokenMiddleware from '../middlewares/authToken.js'

const router = express.Router()

router.post('/api/user/signup',userControllers.signup)
router.post('/api/user/signin',userControllers.signin)
router.get('/api/user/getallfiles',authTokenMiddleware,userControllers.getUploadedAllFiles)
router.get('/api/user/getfiles/:userName',authTokenMiddleware,userControllers.getUploadedFiles)
router.post('/api/user/upload',authTokenMiddleware,uploads,userControllers.uploadFile)
router.patch('/api/user/removefile',authTokenMiddleware,userControllers.removeFile)
router.get('/api/user/verifysecret/:fileId/:secret',authTokenMiddleware,userControllers.secretKeyVerification)

export default router