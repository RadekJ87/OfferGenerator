function generateError(res, message){
    res.render('offer/error.hbs', {
        message,
    });
}

module.exports = {
    generateError,
}