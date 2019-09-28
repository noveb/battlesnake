// connection.js
const mongoose = require('mongoose');
// const gameData = require('./gameData.model');

const connection = 'mongodb://mongo:27017/battlesnake';
// const options = {
//     user: process.env.ME_CONFIG_MONGODB_ADMINUSERNAME,
//     pass: process.env.ME_CONFIG_MONGODB_ADMINPASSWORD,
// };
const connectDb = () => {
    return mongoose.connect(connection);
};

module.exports = connectDb;
