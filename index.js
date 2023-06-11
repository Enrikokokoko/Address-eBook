const express = require("express");
const cors = require("cors")
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
const router = require("./Ebook/router/ebookRouter");
const authRouter = require("./Auth/router/authRouter");
const { DB_URL, PORT } = require("./config");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api', router);


async function start() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

start();
