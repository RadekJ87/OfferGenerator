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
        console.log('products', products);
        // const productID = this.howManyProductsContainsOffer(mainID) + 1; //rzutowanie na number?

        //tworzymy nowy obekt typu produkt
        const newProduct = {
            innerID: uuid(),
            ...obj,
        }
        console.log('nowy', newProduct)
        //dodajemy do tablicy i zasisujemy do json obiekt data
        products.push(newProduct);
        console.log('wszyttkie', this.getAllData());
        await writeFile(this.fileName, JSON.stringify(this.getAllData()));
    }

    async removeProduct(mainID, productID) {
        //ok
        // pobierz tablice produktow z oferty, usun jeden element -> znajduje go metoda findPositioninProductsArray
        let products = this.getAllProductsFromOffer(mainID).splice(this.findPositionInProductsArray(mainID, productID), 1);
        await writeFile(this.fileName, JSON.stringify(this.getAllData()));
    }

    //pobierz cala liste ofert
    getAllData() {
        return this._data;
    }

    //pobierz pojedyncza oferte
    getSingleData(mainID) {
        return this._data.find((oneClient) => oneClient.mainID === mainID);
    }

    //pobierz produkty z pojedynczej oferty
    getAllProductsFromOffer(mainID) {
        // (this.getSingleData(mainID).products).forEach(product => console.log(product.innerID));
        return this.getSingleData(mainID).products;
    }

    //pobierz ilosc produktow ile obecnie jest w pojedynczej ofercie
    howManyProductsContainsOffer(mainID) {
        const qty = this.getAllProductsFromOffer(mainID);
        return qty.length;
    }

    findPositionInProductsArray(offerID, productID) {
        // pobierz wszystkie produkty z oferty, znajdz index na postawie inner id, konweruje do number i zwroc
        // const allProducts = this.getAllProductsFromOffer(offerID);
        // const foundProduct = Number(allProducts.findIndex( product => product.innerID === productID));
        // return foundProduct;

        //refactor
        return Number((this.getAllProductsFromOffer(offerID)).findIndex(product => product.innerID === productID));
    }

    refreshInnerID() {
        //motoda przeladowujaca liste produktow po usunieciu
    }
}

const db = new Db('offers-list.json');

module.exports = {
    db,
}