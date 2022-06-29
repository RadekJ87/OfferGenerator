const express = require('express');
const {db} = require("../utils/db");
const {generateError} = require("../utils/error");
const offerRouter = express.Router();


offerRouter

    // widok główny aplikacji
    // lista ofert
    .get('/', (req, res) => {
        res.render('offer/list-all', {
            offers: db.getAllOffers(),
        });
    })

    //widok przejdz - pojedyncza oferta
    .get('/:id', (req, res) => {
        res.render('offer/list-one', {
            offer: db.getSingleOffer(req.params.id),
            products: db.getAllProductsFromOffer(req.params.id),
        });
    })

    //widok przejdz - pojedyncza oferta - podglad wydruku
    .get('/:id/preview', (req, res) => {
        res.render('offer/print-preview', {
            offer: db.getSingleOffer(req.params.id),
        });
    })

    //widok zmien
    .get('/modify/:id', (req, res) => {
        res.render('offer/edit-one', {
            offer: db.getSingleOffer(req.params.id),
            products: db.getAllProductsFromOffer(req.params.id),
        });
    })

    //dodanie produktu do oferty
    .post('/modify/:id', async (req, res) => {
        //tutaj powinno renderować ponownie listę produtków w ofercie, wieć widok edit one - sprawdzić

        //obluga bledow musi byc tutaj bo nie tworzymy obiektow
        if (req.body.price === '5000') {
            res.send('Zla cena');
        } else {
            await db.addProduct(req.params.id, req.body);
            res.render('offer/edit-one', {
                offer: db.getSingleOffer(req.params.id),
                products: db.getAllProductsFromOffer(req.params.id),
            });
        }
    })

    //usuniecie produktu do oferty
    .delete('/modify/:id/:product', async (req, res) => {
        // res.send(req.params);
        await db.removeProduct(req.params.id, req.params.product);
        res.render('offer/edit-one', {
            offer: db.getSingleOffer(req.params.id),
            products: db.getAllProductsFromOffer(req.params.id),
        });
    })

    // widok głowny - usun oferte
    .delete('/delete/:id', async (req, res) => {
        const {customerName, projectNumber} = db.getSingleOffer(req.params.id)

        await db.deleteOffer(req.params.id);

        res.render('offer/deleted', {
            projectNumber,
            customerName,
        })
    })

    //przejdz do formularza dodawania nowej oferty
    .get('/forms/create-new-offer', (req, res) => {
        res.render('offer/forms/create-new-offer');
    })

    // dodanie nowej oferty
    .post('/', async (req, res) => {
        const {customerName, projectNumber} = req.body;

        if(isNaN(Number(projectNumber))){
            return generateError(res, `Numer oferty musi być liczbą składającą się z conajmniej 7 znaków a maksymalnie 10`);
        }
        await db.createNewRFQ(req.body);
        res.render('offer/created', {
            projectNumber,
            customerName,
        })
    });




































//
// .put('/:id', (req, res) => {
//     res.send('zaktualizowano oferte');
// })
// .delete('/:id', (req, res) => {
//     res.send('usunieto oferte');
// })
// .delete('/:id/:product', (req, res) => {
//     res.send('usunieto produkt z oferty');
// })


module.exports = {
    offerRouter,
}