const handlebarsHelpers ={
    listAllIndex: (value) => parseInt(value) + 1,
    getTotalSum: (products) => {
        let sum = products.reduce((acc, curr) => acc + curr.price*curr.quantity, 0);

        return Number(sum).toFixed(2);
    },
};

module.exports = {
    handlebarsHelpers,
}