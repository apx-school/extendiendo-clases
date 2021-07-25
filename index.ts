import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

class ListaDeCosas {
    name: string;
    cosas: any[] = [];
    constructor(name: string) {
        // nombre de esta lista
        this.name = name;
    }
    add(nuevaCosa) {
        this.cosas.push(nuevaCosa);
    }
    getCosas() {
        return this.cosas;
    }
}

class Product {
    name: string;
    price: number;
    id: number;
    constructor(name: string, price: number, id: number) {
        this.name = name;
        this.price = price;
        this.id = id;
    }
}

class ListaDeProductos extends ListaDeCosas {
    constructor(name: string) {
        super(name);
        var getProduct = fs
            .readFileSync(__dirname + "/products.json").toString();
        var products = JSON.parse(getProduct);
        products.forEach((item) => {
            return this.addProduct(item)
        });
    }
    addProduct(product: Product) {
        return this.add(product);
    }
    getProduct(id: number): Product {
        return this.cosas.find((item) => id == item.id);
    }
    removeProduct(id: number) {
        return remove(this.cosas, (item) => item.id == id);
    }
    getSortedByPrice(order: "asc" | "desc"){
        return orderBy(this.cosas, ["price"], [order]);
    }
}

export { ListaDeProductos, Product };
