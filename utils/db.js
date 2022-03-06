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
    async addProduct(mainID, obj) {
        // metoda pobiera tablice produktow
        // metoda sprawdza wielkosc tablicy z prodtami
        const products = this.getAllProductsFromOffer(mainID);
        const productID = this.howManyProductsContainsOffer(mainID) + 1; //rzutowanie na number?

        //tworzymy nowy obekt typu produkt
        const newProduct = {
            innerID: productID,
            ...obj,
        }
        //dodajemy do tablicy i zasisujemy do json obiekt data
        products.push(newProduct);
        await writeFile(this.fileName, JSON.stringify(this.getAllData()));
    }

    async removeProduct(mainID, number) {
        const products = this.getAllProductsFromOffer(mainID).splice(number - 1, 1);
        //const filtered = products.filter(product => product.innerID !== number);
        // console.log(products);
        // console.log(filtered);

        //trzeba refaktor do this data//
        // console.log(this.getAllData());
        await writeFile(this.fileName, JSON.stringify(this.getAllData()));

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
    howManyProductsContainsOffer(mainID) {
        const qty = this.getAllProductsFromOffer(mainID);
        return qty.length;
        // console.log('Ilość produtków', qty);
        // console.log(qty.length);
    }

    refreshInnerID(){
        //motoda przeladowujaca liste produktow po usunieciu
    }
}

const db = new Db('offers-list.json');


module.exports = {
    db,
}