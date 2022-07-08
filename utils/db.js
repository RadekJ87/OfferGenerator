const {writeFile, readFile} = require('fs').promises;
const {v4: uuid} = require('uuid')
const {join} = require('path');

class Db {
    constructor(fileName) {
        this.fileName = join(__dirname, '../data/', fileName);
        this._loadData();
    }

    // wczytywanie danych, obiekt JSON
    async _loadData() {
        try {
            this._data = JSON.parse(await readFile(this.fileName, 'utf8'));
        } catch (e) {
            await writeFile(this.fileName, '[]', 'utf8')
        }
    }

    //pobierz cala liste ofert
    getAllOffers() {
        return this._data;
    }

    //pobierz pojedyncza oferte
    getSingleOffer(mainID) {
        return this._data.find((oneClient) => oneClient.mainID === mainID);
    }

    //pobierz produkty z pojedynczej oferty
    getAllProductsFromOffer(mainID) {
        return this.getSingleOffer(mainID).products;
    }


    //utwórz ofertę
    async createNewRFQ(obj) {

        const newQuotation = {
            mainID: uuid(),
            ...obj,
            createdAt: new Date(Date.now()).toLocaleDateString(),
            validThru: new Date((Date.now() + (3600 * 1000 * 24 * 30))).toLocaleDateString(),
            projectNumber: Number(obj.projectNumber),
            products: [],
        }
        this._data.push(newQuotation);

        await writeFile(this.fileName, JSON.stringify(this._data));
    }

    //usun oferte
    async deleteOffer(mainID) {
        const products = this._data.filter(oneClient => oneClient.mainID !== mainID);

        await writeFile(this.fileName, JSON.stringify(products));
    }

    //dodaj produkty
    async addProduct(mainID, obj) {
        const products = this.getAllProductsFromOffer(mainID);

        const newProduct = {
            innerID: uuid(),
            ...obj,
            price: Number(obj.price),
            quantity: Number(obj.quantity),
        }

        products.push(newProduct);

        await writeFile(this.fileName, JSON.stringify(this._data));
    }

    async removeProduct(mainID, productID) {
        this.getAllProductsFromOffer(mainID).splice(this.findPositionInProductsArray(mainID, productID), 1);

        await writeFile(this.fileName, JSON.stringify(this._data));
    }


    //sprawdz pozycje produktu w tablicy - do usuwania produktow
    findPositionInProductsArray(offerID, productID) {
        return Number((this.getAllProductsFromOffer(offerID)).findIndex(product => product.innerID === productID));
    }


    //sprawdz czy nie duplikujesz numeru oferty
    checkOfferNumber(projectNumber) {
        return this._data.map(obj => obj.projectNumber).some((item) => item === projectNumber);
    }

}

const db = new Db('offers-list.json');

module.exports = {
    db,
}