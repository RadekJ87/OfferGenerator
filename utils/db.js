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

    getAllData() {
        return this._data;
    }

   getSingleData(mainID) {
       return this._data.find((oneClient) => oneClient.mainID === mainID);
   }

   getAllProductFromOffer(mainID) {
        const offer = this._data.find((oneClient) => oneClient.mainID === mainID);
        return offer.products;
    }

}
const db = new Db('offers-list.json');

module.exports = {
    db,
}