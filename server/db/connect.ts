import * as mongoose from "mongoose";
import 'dotenv/config';
import {ConnectOptions} from "mongoose";

const DB_CONNECT = process.env.DB_CONNECT;

mongoose
    .connect(DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "shopzon"
    } as ConnectOptions)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
//mongoose.connect('mongodb+srv://getnivinjohn:H9ZfnXTtJd9gKQNM@cluster0.eqjrbs2.mongodb.net/courses', { dbName: "todos" });
