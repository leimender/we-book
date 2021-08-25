// const db = require('../config').mongodb
import config from '../config'
import mongoose from "mongoose"
const db = config.mongodb

// const mongoose = require("mongoose")

const book_url = `mongodb://${db.host}:${db.port}/${db.database}`

const option = {
    user: db.user,
    pass: db.pass,
}

const bookDatabase = mongoose.createConnection(book_url)

bookDatabase.on("open", () => {
    console.log("预约数据库连接成功");
})

bookDatabase.on("error", (err) => {
    console.error("error in mongodb connection", err);
    mongoose.disconnect()
})

bookDatabase.on("close", () => {
    console.log("预约数据库连接断开，重新链接中...")
    mongoose.connect(url, option);
})

module.exports = {
    bookDatabase
};

