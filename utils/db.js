const {writeFile, readFile} = require('fs').promises;
const {join} = require('path');

class Db {
    constructor(fileName) {
        this.fileName = join(__dirname,'../data/',fileName);
        // console.log(this.fileName);
        this._loadData();
        // this.counterid = 1;

    }

    async _loadData() {
        this._data = JSON.parse(await readFile(this.fileName, 'utf8'));
        // console.log(this._data[0]);
    }

    //utwórz ofertę
    createOffer(obj){

    }
    //dodaj produkty do istniejącej oferty
    addProduct(id, obj){}

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