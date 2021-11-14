const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const { homeRouter } = require('./routers/home');
const { offerRouter } = require('./routers/offer');



const app = express();
//const hbs = exphbs.create({ /* config */ });

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.engine('.hbs', hbs.engine());
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/offer', offerRouter);

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});