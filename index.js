const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/products', (req, res) => {
    const { limit } = req.query;
    const products = ProductManager.getAllProducts();

    if (limit) {
        const parsedLimit = parseInt(limit, 10);
        res.json(products.slice(0, parsedLimit));
    } else {
        res.json(products);
    }
});

app.get('/products/:pid', (req, res) => {
    const productId = req.params.pid;
    const product = ProductManager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
