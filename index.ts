import * as matches from "lodash/matches";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";
import * as reverse from "lodash/reverse";
import * as fs from "fs";

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
        const productsBufferToString = fs
            .readFileSync(__dirname + "/products.json")
            .toString();

        const productsJSON = JSON.parse(productsBufferToString);
        productsJSON.forEach((element) => {
            this.addProduct(element);
        });
    }

    addProduct(product: Product) {
        this.add(product);
    }

    getProduct(id: number): Product {
        const cosas = this.getCosas();
        return cosas.find((c) => c.id == id);
    }

    removeProduct(id: number) {
        remove(this.cosas, (n) => n.id == id);
    }

    getSortedByPrice(order: "asc" | "desc") {
        return orderBy(this.cosas, ["price"], [order]);
    }
}

export { ListaDeProductos, Product };
