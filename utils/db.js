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
        //dodaj zapis


        await writeFile(this.fileName, JSON.stringify(file));
    }

    //dodaj produkty do istniejącej oferty - metoda przyjmuje id oraz obiekt, musi wiedziec ile jest lementów w tablicy products
    addProduct(mainID, obj) {
        //pobierz dane oferty
        //dodaj do obietu
        //utworz id dla produkty wykorzystujac metode sprawdzajaca obecna wielkosc tablicy produktow dla pojedynczej oferty
        //howManyProductsContainsOffer
        const currentOffer = this.getSingleData(mainID);
        const productID = this.howManyProductsContainsOffer(mainID) + 1; //rzutowanie na number?
        console.log(productID);

        //todo
        //dostan sie do tablicy produktow i wsztyknij utworzony obiekt na postawie danych z body

        console.log('Obecna zawartość oferty:', currentOffer);
        console.log('Dane z body:', obj);
    }

    //pobierz cala liste
    getAllData() {
        return this._data;
    }

    //pobierz pojedynczy rekord
    getSingleData(mainID) {
        return this._data.find((oneClient) => oneClient.mainID === mainID);
    }

    //pobierz produkty z pojedynczego rekordu
    getAllProductsFromOffer(mainID) {
        return this.getSingleData(mainID).products;
        // return (this._data.find((oneClient) => oneClient.mainID === mainID)).products;
        //return offer.products;
    }
    //pobierz ilosc produktow ile obecnie jest w pojedynczej ofercie
    howManyProductsContainsOffer(mainID){
        const qty = this.getAllProductsFromOffer(mainID);
        return qty.length;
        // console.log('Ilość produtków', qty);
        // console.log(qty.length);
    }
}

const db = new Db('offers-list.json');


module.exports = {
    db,
}