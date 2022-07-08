const express = require('express');
const {db} = require("../utils/db");
const {generateError} = require("../utils/error");
const offerRouter = express.Router();


offerRouter

    .get('/', (req, res) => {
        res.render('offer/list-all', {
            offers: db.getAllOffers(),
        });
    })

    .get('/:id', (req, res) => {
        const offer = db.getSingleOffer(req.params.id);

        if (!offer) {
            return generateError(res, 'Oferta o podannym ID nie istnieje!');
        }

        const products = db.getAllProductsFromOffer(req.params.id);

        res.render('offer/list-one', {
            offer,
            products,
        });
    })

    .get('/:id/preview', (req, res) => {
        const offer = db.getSingleOffer(req.params.id);

        if (!offer) {
            return generateError(res, 'Oferta o podannym ID nie istnieje!');
        }

        res.render('offer/print-preview', {
            offer,
        });
    })

    .get('/modify/:id', (req, res) => {
        const offer = db.getSingleOffer(req.params.id);

        if (!offer) {
            return generateError(res, 'Oferta o podannym ID nie istnieje!');
        }

        res.render('offer/edit-one', {
            offer,
            products: db.getAllProductsFromOffer(req.params.id),
        });
    })

    .post('/modify/:id', async (req, res) => {
        await db.addProduct(req.params.id, req.body);
        res.render('offer/edit-one', {
            offer: db.getSingleOffer(req.params.id),
            products: db.getAllProductsFromOffer(req.params.id),
        });
    })


    .delete('/modify/:id/:product', async (req, res) => {
        await db.removeProduct(req.params.id, req.params.product);

        res.render('offer/edit-one', {
            offer: db.getSingleOffer(req.params.id),
            products: db.getAllProductsFromOffer(req.params.id),
        });
    })


    .delete('/delete/:id', async (req, res) => {
        const {customerName, projectNumber} = db.getSingleOffer(req.params.id)

        await db.deleteOffer(req.params.id);

        res.render('offer/deleted', {
            projectNumber,
            customerName,
        })
    })


    .get('/forms/create-new-offer', (req, res) => {
        res.render('offer/forms/create-new-offer');
    })


    .post('/', async (req, res) => {
        const {customerName, projectNumber} = req.body;

        if (isNaN(Number(projectNumber))) {
            return generateError(res, `Numer oferty musi być liczbą składającą się z conajmniej 7 znaków a maksymalnie 10`);
        }

        if (db.checkOfferNumber(Number(projectNumber))) {
            return generateError(res, 'Oferta o takim numerze już istnieje. Upewnij się czy podajesz właściwy numer oferty')
        }

        await db.createNewRFQ(req.body);

        res.render('offer/created', {
            projectNumber,
            customerName,
        });

    });


module.exports = {
    offerRouter,
}