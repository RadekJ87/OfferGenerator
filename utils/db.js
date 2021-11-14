const {writeFile, readFile} = require('fs').promises;
const {join} = require('path');

class Db {
    constructor(fileName) {
        this.fileName = join(__dirname,'../data/',fileName);
        // console.log(this.fileName);
        this._loadData();

    }

    async _loadData() {
        this._data = JSON.parse(await readFile(this.fileName, 'utf8'));
        console.log(this._data[0]);
    }
}
const db = new Db('offers-list.json');

module.exports = {
    db,
}