const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const apiDocs = require('./swagger.json');

const app = express();
app.use(cors())

const { getProducts, getProduct } = require('./resolvers');

const PORT = process.env.PORT || 5000;

app.get('/api/getProductsList', (req, res) => {
    const params = Object.keys(req.query);
    let result = null; 
    if(!params.length) {
        result = getProducts()
    } else {
        result = params.length === 1 ? 
            getProducts(req.query[params[0]]) :
            getProducts(req.query[params[0]], req.query[params[1]]);
    }
    return res.status(result.status || 200).send(result);
});
app.get('/api/getProduct', (req, res) => {
    const params = Object.keys(req.query);
    if(!params.length) {
        return res.status(404).send()
    }
    const { status, data } = getProduct(req.query[params[0]]);
    return res.status(status).send(data);
});
app.get('/', (_, res) => res.sendFile(path.resolve(`client/index.html`)));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));
app.get('/*', (req, res) => res.sendFile(path.resolve(`client/${req.path}`)));

app.listen(PORT);