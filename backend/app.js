const express = require('express');

const userRouter = require('./routes/user');
const db = require('./db');

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);

app.listen(8000, () => {
    console.log("Server listening on port 8000");
});