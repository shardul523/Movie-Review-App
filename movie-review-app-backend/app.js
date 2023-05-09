const express = require('express');
require('express-async-errors');

const userRouter = require('./routes/user');
const {errorHandler} = require('./middlewares/error')
require('./db');

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);

app.use(errorHandler);

app.listen(8000, () => {
    console.log("Server listening on port 8000");
});