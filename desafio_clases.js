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
    constructor(products) {
        this.products = products;
    }
    addProduct = (producto) =>{
        if(typeof producto.title == 'undefined' || typeof producto.description == 'undefined' || typeof producto.price == 'undefined' || typeof producto.thumbnail == 'undefined' || 
        typeof producto.code == 'undefined' || typeof producto.stock == 'undefined') {
            console.log('El producto contiene alguna propiedad no definida');
        } else {
            let flag = false;
            for(let i = 0; i < this.products.length; i++) {
                if(producto.code == this.products[i].code) {
                    flag = true;
                }
            }
            if (flag) {
                console.log('Código del producto repetido');
            } else {
                producto.id = this.products.length;
                this.products.push(producto);
            }
        }
    }
    
    getProducts = () =>{
        console.log(this.products);
    }
    
    getProductById = (id) =>{
        let index = -1;
        for(let i = 0; i < this.products.length; i++) {
            if(id == this.products[i].id) {
                index = i;
            }
        }
        if(index == -1) {
            console.log('ID not found');
        } else {
            console.log(this.products[index]);
        }
    }
}


let prodsArray = [];
let productManager = new ProductManager(prodsArray);

let producto1 = new Product("a", "b", "c", "d", "ei", "f");
let producto2 = new Product("a", "b", "c", "d", "eia", "f");
productManager.addProduct(producto1);
productManager.addProduct(producto2);
productManager.getProducts();
productManager.getProductById(12);
productManager.getProductById(1);

