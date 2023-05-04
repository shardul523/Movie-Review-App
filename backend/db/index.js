const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/review_app')
.then(() => {console.log('connected to db')})
.catch((exc) => {console.error(exc)});