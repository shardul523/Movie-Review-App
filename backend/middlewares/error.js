exports.errorHandler = (err, req, res, next) => {
    console.error("err: ",err);
    res.status(500).json({error: err.message || err});
};