import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./Models/BookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// middleware for cors policy
// 1.allow all origins with default of cors
app.use(cors());
// 2.allow custom origin
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders:['Content-Type']

// })
// );

app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome");
});

app.use('/books',booksRoute)
// Connect to MongoDB and start the server
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to the database");
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });




