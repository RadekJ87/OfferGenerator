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
        const {customer, projectNumber} = req.body;
        db.createNewRFQ(req.body);
        res.render('offer/created', {
            projectNumber,
            customer,

        })
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