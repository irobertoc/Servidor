const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    _readFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    _writeFile(data) {
        fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    }

    addProduct(product) {
        const products = this._readFile();
        if (!products.length) {
            product.id = 1;
        } else {
            const lastId = products[products.length - 1].id;
            product.id = lastId + 1;
        }
        products.push(product);
        this._writeFile(products);
    }

    getProducts() {
        return this._readFile();
    }

    getProductById(id) {
        const products = this._readFile();
        return products.find((product) => product.id === id) || null;
    }

    updateProduct(id, updatedFields) {
        const products = this._readFile();
        const productIndex = products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            delete updatedFields.id;
            products[productIndex] = { ...products[productIndex], ...updatedFields };
            this._writeFile(products);
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        const products = this._readFile();
        const filteredProducts = products.filter((product) => product.id !== id);
        if (filteredProducts.length !== products.length) {
            this._writeFile(filteredProducts);
            return true;
        }
        return false;
    }
}

const pathToProductsFile = 'productos.json';
const productManager = new ProductManager(pathToProductsFile);

const product1 = {
    title: 'Producto 1',
    description: 'Descripción del Producto 1',
    price: 10.99,
    thumbnail: 'ruta/imagen1.jpg',
    code: 'P001',
    stock: 100,
};
productManager.addProduct(product1);

const allProducts = productManager.getProducts();
console.log(allProducts);

const productIdToFind = 1;
const productFound = productManager.getProductById(productIdToFind);
console.log(productFound);

const productIdToUpdate = 1;
const updatedFields = {
    price: 12.99,
    stock: 90,
};
productManager.updateProduct(productIdToUpdate, updatedFields);

const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);
