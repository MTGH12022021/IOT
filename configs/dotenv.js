require("dotenv").config({});

module.exports = {
    urlMongo: process.env.URL_MONGO,
    databaseImg: process.env.DATABASE_IMG,
    databaseVegetable: process.env.DATABASE_VEGETABLE,
    imgBucket: process.env.IMG_BUCKET,
    port: process.env.port,

    mailUserName: process.env.MAIL_USERNAME,
    mailPassword: process.env.MAIL_PASSWORD,
    mailFormAddress: process.env.MAIL_FROM_ADDRESS,
}