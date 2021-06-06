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
        const productos = JSON.parse(
            fs.readFileSync("products.json").toString()
        );
        productos.forEach((obj) => {
            this.addProduct(obj);
        });
    }
    addProduct(producto: Product) {
        var productoExistente: Product = this.cosas.find((obj) => {
            return obj.id == producto.id;
        });
        if (!productoExistente) {
            this.add(producto);
        }
    }
    getProduct(id: number): Product {
        return this.cosas.find((obj) => {
            return obj.id == id;
        });
    }
    removeProduct(id: number) {
        remove(
            this.cosas,
            this.cosas.find((obj) => {
                return obj.id == id;
            })
        );
    }
    getSortedByPrice(order: "asc" | "desc") {
        return orderBy(
            this.cosas,
            "price",
            // this.cosas.map((obj) => {
            //     return obj.price;
            // }),
            order
        );
    }
}

export { ListaDeProductos, Product };
