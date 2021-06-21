const { Products } = require('./db');

module.exports = {
    getProducts: function (nProducts = 10, sortBy='price') {
        let sortedProducts =  [...Products];
        if(!sortedProducts[0][sortBy]) {
            return {
                status: 400,
                message: `sortBy provided (${sortBy}) is invalid. Try one of the product properties instead`
            }
        }
        sortBy === 'price' ? 
        sortedProducts.sort((a,b) => a.price - b.price) : 
        sortedProducts.sort((a,b) => {
                const aProp = a[sortBy].toUpperCase();
                const bProp = b[sortBy].toUpperCase();
                if (aProp < bProp) {
                    return -1;
                  }
                return aProp > bProp ? 1 : 0;
                });
        return {
            status: 200,
            data: sortedProducts.slice(0, nProducts)
        }
    },
    getProduct: function (productId) {
        if(!productId || productId < 1) { 
            return {
                status: 400
            }
        }
        if(Products.length < productId) {
            return {
                status: 404
            }
        }
        const product = Products[productId - 1];
        return {
            status: 200,
            data: product
        };
    }
}