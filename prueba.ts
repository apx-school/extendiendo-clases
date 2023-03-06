import * as productsData from "./products.json"
import * as remove from "./node_modules/lodash/remove"
class ListaDeCosas {
    name:string;
    cosas: any[] = []
    constructor(name:string) {
        this.name = name 
    }
    add(nuevaCosa:any) {
        this.cosas.push(nuevaCosa)
    }
    getCosas() {
        return this.cosas
    }
}

class Product {
    name:string;
    price:number;
    id:number;
    constructor(name:string, price:number, id:number) {
        this.name = name
        this.price = price
        this.id = id
    }
}

class ListaDeProductos extends ListaDeCosas {
    products:Product[] = productsData
    addProduct(product:Product) {
        const buscar = this.products.find(item => item.id == product.id)
        if(buscar == undefined) {
            this.products.push(product)
        }
    }
    constructor(name:string, products:Product[]) {
        super(name);
        this.products = products
    }
    getProduct(id:number):Product {
        const productoPorID = this.products.find(item => item.id == id)
        if(productoPorID != undefined) {
            return productoPorID
        } else {
            throw "El producto no se encuentra"
        }
    }
    removeProduct(id:number):Product {
        const productoPorID = this.products.find(item => item.id == id)
        if(productoPorID == undefined) {
            remove(productoPorID)
        }
        return productoPorID 
    }
}

function main() {
    const lista = new ListaDeProductos("Mi Lista", [])
    lista.add("Lista del Super")
    lista.addProduct(productsData[0])
    lista.addProduct(productsData[1])
    lista.addProduct(productsData[2])
    lista.addProduct(productsData[3])
    lista.addProduct(productsData[4])
    console.log(lista);
    lista.removeProduct(2)
    console.log(lista);
    

    
    
}
main()