const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const { homeRouter } = require('./routers/home');
const { offerRouter } = require('./routers/offer');
const {db} = require('./utils/db');

const app = express();

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.engine('.hbs', hbs.engine({
    extname: '.hbs',
}));
app.set('view engine', '.hbs');


app.use('/', homeRouter);
app.use('/offer', offerRouter);

app.get('/test', (req, res) => {
    // res.send(db.getSingleData('1'));
    res.send(db.getAllProductsFromOffer('1'));
});


app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});