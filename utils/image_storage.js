// Подключаем модуль
var EasyYandexS3 = require("easy-yandex-s3");

// Инициализация
var s3 = new EasyYandexS3({
    auth: {
        accessKeyId: "y1Ylvh3ZjqZ8F9L7fP9G",
        secretAccessKey: "UwyK7t9-ZTyVGP8qpMW-5Z2DA7HBLag9-XB6tDIU",
    },
    Bucket: "qfitstorage", // например, "my-storage",
    debug: false // Дебаг в консоли, потом можете удалить в релизе
});

module.exports = s3;