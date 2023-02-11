const express = require('express');

const app = express();

const pm = require('./ProductManager');

app.get('/products', async (req, res) => {
    let limit = req.query.limit;
    let productM = new pm.productManager('./src/productos.txt');
    if(!limit) {
        res.send(await productM.getProducts());
    } else {
        let products = await productM.getProducts();
        if(limit >= products.length) {
            res.send(products);
        } else {
            res.send(products.slice(0, limit));
        }
    }
})

app.get('/products/:pid', async (req, res) => {
    let idProducto = req.params.pid;
    let productM = new pm.productManager('./src/productos.txt');
    res.send(await productM.getProductById(idProducto));
})

app.listen(8080, ()=>console.log("Server listening on port 8080"));