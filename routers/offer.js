const express = require('express');
const offerRouter = express.Router();

offerRouter
    .get('/', (req, res) => {
        // res.send('Lista ofert');
        res.render('offer/list-all');
    })
    .get('/:id', (req, res) => {
        res.send('pojedyncza oferta')
    })


module.exports = {
    offerRouter,
}