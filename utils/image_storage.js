const config = require("./config");
var EasyYandexS3 = require("easy-yandex-s3");

// Инициализация
var s3 = new EasyYandexS3({
    auth: {
        accessKeyId: config.YANDEX_STORAGE_ACCESS_KEY,
        secretAccessKey: config.YANDEX_STORAGE_SECRET_KEY,
    },
    Bucket: config.YANDEX_STORAGE_BUCKET,
    debug: false
});

module.exports = s3;