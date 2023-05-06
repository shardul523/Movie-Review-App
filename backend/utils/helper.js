const { log } = require('console');
const crypto = require('crypto');
const { bulkSave } = require('../models/user');


exports.sendError = (res, error, status=401) => {
    res.status(status).json({error});
};


exports.generateRandomBytes = () => {
    return new Promise((res, rej) => {
        crypto.randomBytes(30, (err, buffer) => {
            if (err) rej(err);

            const buffString = buffer.toString('hex');
            console.log(buffString);
            res(buffString);
        });
    });
};