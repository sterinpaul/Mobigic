import dotENV from 'dotenv';
dotENV.config()

const configKeys = {
    MONGODB_ATLAS_URL:process.env.MONGODB_ATLAS_URL,
    PORT:process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}
export default configKeys