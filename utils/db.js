const {writeFile, readFile, appendFile} = require('fs').promises;
const {v4: uuid} = require('uuid')
const {join} = require('path');

class Db {
    constructor(fileName) {
        this.fileName = join(__dirname, '../data/', fileName);
        this._loadData();
    }

    // wczytywanie danych, obiekt JSON
    async _loadData() {
        this._data = JSON.parse(await readFile(this.fileName, 'utf8'));
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

    async deleteOffer(mainID) {
        const products = this._data.filter(oneClient => oneClient.mainID !== mainID);

        await writeFile(this.fileName, JSON.stringify(products));
    }

    //dodaj produkty do istniejącej oferty - metoda przyjmuje id oraz obiekt, musi wiedziec ile jest lementów w tablicy products
    async addProduct(mainID, obj) {
        // metoda pobiera tablice produktow
        const products = this.getAllProductsFromOffer(mainID);

        //tworzymy nowy obekt typu produkt
        const newProduct = {
            innerID: uuid(),
            ...obj,
            price: Number(obj.price),
            quantity: Number(obj.quantity),
        }

        //dodajemy do tablicy i zapisujemy do json obiekt data
        products.push(newProduct);
        // console.log('wszyttkie', this.getAllData());
        await writeFile(this.fileName, JSON.stringify(this.getAllOffers()));
    }

    async removeProduct(mainID, productID) {
        //ok
        // pobierz tablice produktow z oferty, usun jeden element -> znajduje go metoda findPositioninProductsArray
        const products = this.getAllProductsFromOffer(mainID).splice(this.findPositionInProductsArray(mainID, productID), 1);
        await writeFile(this.fileName, JSON.stringify(this.getAllOffers()));
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