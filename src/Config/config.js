import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 9090,
    persistence: process.env.PERSISTENCE || 'filesystem',
    urlMongoDB: process.env.URL_MONGO || 'mongodb://localhost:27017/ecommerce'
};