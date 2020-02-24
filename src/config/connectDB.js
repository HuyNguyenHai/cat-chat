import mongoose from "mongoose";
import bluebird from "bluebird";

/**
 * Connect to MongoDB
 */

 let connectDB = () => {
    mongoose.Promise = bluebird;

   //  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
   // let URI = `${process.env.DB_CONNECTION_STRING}`
   let URI = `mongodb+srv://admin:1@cluster0-xe0bx.mongodb.net/test?retryWrites=true&w=majority`
    return mongoose.connect(URI, {
      useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
      dbName: 'cat-chat-vn',
      useFindAndModify: false
      });
 };

module.exports = connectDB;