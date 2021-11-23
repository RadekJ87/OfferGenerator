const express = require('express');
const {db} = require("../utils/db");
const offerRouter = express.Router();


offerRouter
    //wyswielt wszystkie
    .get('/', (req, res) => {
        // res.send('Lista ofert');
        // console.log(db.getAllData());
        res.render('offer/list-all', {
            offers: db.getAllData(),
        });
    })
    //wyswielt jedna oferte
    .get('/:id', (req, res) => {
        // res.send('pojedyncza oferta');
        // console.log(db.getSingleData(req.params.id));
        res.render('offer/list-one', {
            offer: db.getSingleData(req.params.id),
            products: db.getAllProductsFromOffer(req.params.id),
        });
    })
    //drukowanie pojedynczej oferty
    .get('/:id/preview', (req, res) => {
        res.render('offer/print-preview', {
            offer: db.getSingleData(req.params.id),
        });
    })
    //dodaj nowa oferte - widok dodawanie klienta oraz numeru projektu
    .get('/forms/create-new-offer', (req, res) => {
        res.render('offer/forms/create-new-offer')
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