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
            offer: db.getSingleData(req.params.id),
            products: db.getAllProductsFromOffer(req.params.id),
        });
    })
    .post('/', (req, res) => {
        res.send('zapisano oferte do bazy');
    })
    .put('/:id', (req, res) => {
        res.send('zaktualizowano oferte');
    })
    .delete('/:id', (req, res) => {
        res.send('usunieto oferte');
    })
    .delete('/:id/:product', (req, res) => {
        res.send('usunieto produkt z oferty');
    })



module.exports = {
    offerRouter,
}