const express = require('express');
const {db} = require("../utils/db");
const offerRouter = express.Router();


offerRouter
    //widok główny
    //list-all - Lista ofert - ok
    .get('/', (req, res) => {
        // res.send('Lista ofert');
        // console.log(db.getAllData());
        res.render('offer/list-all', {
            offers: db.getAllData(),
        });
    })

    //tworzenie oferty
    //dodaj nowa oferte - widok dodawanie klienta oraz numeru projektu
    .get('/forms/create-new-offer', (req, res) => {
        res.render('offer/forms/create-new-offer')
    })

    //dodanie nowej oferty
    .post('/', (req, res) => {
        const {customer, projectNumber} = req.body;
        db.createNewRFQ(req.body);
        res.render('offer/created', {
            projectNumber,
            customer,

        })
    })


    //widok po wejsciu w opcje ofert
    //list-one - widok pojedynczej - ok
    .get('/:id', (req, res) => {
        // res.send('pojedyncza oferta');
        // console.log(db.getSingleData(req.params.id));
        res.render('offer/list-one', {
            offer: db.getSingleData(req.params.id),
            products: db.getAllProductsFromOffer(req.params.id),
        });
    })

    //edit-one - edycja oferty
    .get('/modify/:id', (req, res) => {
        // res.send('modyfikacja oferty');
        // console.log(db.getSingleData(req.params.id));
        res.render('offer/edit-one', {
            offer: db.getSingleData(req.params.id),
            products: db.getAllProductsFromOffer(req.params.id),
        });
    })
    //dodanie produktu do oferty
    .post('/modify/:id', (req, res) => {
        //tutaj powinno renderować ponownie listę produtków w ofercie, wieć widok edit one - sprawdzić
        // res.render('offer/edit-one', {
        //     offer: db.getSingleData(req.params.id),
        //     products: db.getAllProductsFromOffer(req.params.id),
        // });
        db.addProduct(req.params.id, req.body);
        db.howManyProductsContainsOffer(req.params.id);
        // console.log(req.params.id);
        res.send(req.body);
        // console.log(req.body);
        //dodaj pozycje do tablicy produktow
    })









    //drukowanie pojedynczej oferty
    .get('/:id/preview', (req, res) => {
        res.render('offer/print-preview', {
            offer: db.getSingleData(req.params.id),
        });
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