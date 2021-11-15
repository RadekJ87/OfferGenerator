const express = require('express');
const {db} = require("../utils/db");
const offerRouter = express.Router();


offerRouter
    .get('/', (req, res) => {
        // res.send('Lista ofert');
        // console.log(db.getAllData());
        res.render('offer/list-all', {
            offers: db.getAllData(),
        });
    })
    .get('/:id', (req, res) => {
        // res.send('pojedyncza oferta');
        // console.log(db.getSingleData(req.params.id));
        res.render('offer/list-one', {
            //offer jako pojedyncza oferta, products jako elementy wyceny - metoda getAllProductFromOffer
            offer: db.getSingleData(req.params.id),
        });
    })
    .post('/', (req, res) => {
        res.send('zapisano do bazy');
    })
    .put('/:id', (req, res) => {
        res.send('zaktualizowano');
    })
    .delete('/:id', (req, res) => {
        res.send('usunieto');
    })


module.exports = {
    offerRouter,
}