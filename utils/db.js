const {writeFile, readFile, appendFile} = require('fs').promises;
const {v4: uuid} = require('uuid')
const {join} = require('path');

class Db {
    constructor(fileName) {
        this.fileName = join(__dirname, '../data/', fileName);
        // console.log(this.fileName);
        this._loadData();


    }

    async _loadData() {
        this._data = JSON.parse(await readFile(this.fileName, 'utf8'));
        // console.log(this._data[0]);
    }


    //utwórz ofertę
    async createNewRFQ(obj) {
       const {customer, projectNumber} = obj;
        const newQuotation = {
            mainID: uuid(),
            projectNumber: projectNumber,
            customer: customer,
            products: [],
        }
        const file = this._data;
        file.push(newQuotation);
        console.log(file);


        // wywala bo dopisuje
        // await appendFile(this.fileName, JSON.stringify(newQuotation));
    }

    //dodaj produkty do istniejącej oferty
    addProduct(id, obj) {
    }

    getAllData() {
        return this._data;
    }

    //tu można zrobić chyba jedna metode
    getSingleData(mainID) {
        return this._data.find((oneClient) => oneClient.mainID === mainID);
    }

    getAllProductsFromOffer(mainID) {
        return this.getSingleData(mainID).products;
        // return (this._data.find((oneClient) => oneClient.mainID === mainID)).products;
        //return offer.products;
    }

}

const db = new Db('offers-list.json');


module.exports = {
    db,
}