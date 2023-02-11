const fs = require("fs");

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = 0;
    }
}

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }
    addProduct = (producto) =>{
        if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || 
        !producto.code || !producto.stock) {
            console.log('El producto contiene alguna propiedad no definida');
        } else {
            if(fs.existsSync(this.path)) {
                this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            }
            const codeExists = this.products.find(product => product.code == producto.code);

            if (codeExists) {
                console.log('Código del producto repetido');
            } else {
                producto.id = this.products.length;
                this.products.push(producto);
                fs.writeFileSync(this.path, JSON.stringify(this.products, '\t'));
            }
        }
    }
    
    getProducts = async() =>{
        let result = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(result);
    }

    deleteProduct = (id) =>{
        let index = -1;
        if(fs.existsSync(this.path)) {
            this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            for(let i = 0; i < this.products.length; i++) {
                if(id == this.products[i].id) {
                    index = i;
                }
            }
            if(index == -1) {
                console.log('ID not found');
            } else {
                this.products.splice(index, 1);
                fs.writeFileSync(this.path, JSON.stringify(this.products, '\t'));
            }
        } else {
            console.log('No hay productos');
        }
    }

    updateProduct = (id, prod) =>{
        let index = -1;
        if(fs.existsSync(this.path)) {
            this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            for(let i = 0; i < this.products.length; i++) {
                if(id == this.products[i].id) {
                    index = i;
                }
            }
            if(index == -1) {
                console.log('ID not found');
            } else {
                prod.id = id;
                this.products[index] = prod;
                fs.writeFileSync(this.path, JSON.stringify(this.products, '\t'));
            }
        } else {
            console.log('No hay productos');
        }
    }
    
    getProductById = async (id) =>{
        let index = -1;
        if(fs.existsSync(this.path)) {
            let prods = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(prods);
            for(let i = 0; i < this.products.length; i++) {
                if(id == this.products[i].id) {
                    index = i;
                }
            }
            if(index == -1) {
                return 'ID not found';
            } else {
                return this.products[index];
            }
        } else {
            return 'No hay productos';
        }
        
    }
}

module.exports = {
    productManager: ProductManager
}


/*

let productManager = new ProductManager('./productos.txt');

let producto1 = new Product("a", "b", "c", "d", "ei", "f");
let producto2 = new Product("a", "b", "c", "d", "eia", "f");
let producto3 = new Product("a", "b", "c", "d", "eiad", "f");
productManager.addProduct(producto1);
productManager.addProduct(producto2);
productManager.addProduct(producto3);
productManager.getProducts();
productManager.getProductById(12);
productManager.getProductById(1);
productManager.deleteProduct(1);
productManager.updateProduct(0, new Product("a", "b", "c", "d", "updated", "f"));

*/