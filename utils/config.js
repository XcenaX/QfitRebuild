const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    YANDEX_STORAGE_ACCESS_KEY: process.env.YANDEX_STORAGE_ACCESS_KEY,
    YANDEX_STORAGE_SECRET_KEY: process.env.YANDEX_STORAGE_SECRET_KEY,
    YANDEX_STORAGE_BUCKET: process.env.YANDEX_STORAGE_BUCKET,
    EMAIL_HOST_USER: process.env.EMAIL_HOST_USER,
    EMAIL_HOST_PASSWORD: process.env.EMAIL_HOST_PASSWORD,
    EMAIL_PORT: process.env.EMAIL_PORT,
};