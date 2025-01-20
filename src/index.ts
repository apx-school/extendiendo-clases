import products from "./products.json";
import { find, remove, orderBy } from "lodash";

// este tipo se define para ser usado por la funcion getSortedByPrice
type passed = "asc" | "desc" | boolean;

class ListaDeCosas {
    name: string;
    cosas: Product[] = [];
    constructor(name: string) {
        // nombre de esta lista
        this.name = name;
        // se carga el products.json
        products.map((prod) => this.add(prod));
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
    // agrega un producto a la lista de cosas
    addProduct(prod: Product) {
        const ctrl = this.cosas.filter((cosa) => cosa.id === prod.id);
        if (ctrl.length === 0) {
            this.add(prod);
        }
    }

    // devuelve el producto con el id pasado como argumento
    getProduct(id: number): Product {
        const retProd = find(this.cosas, (cosa) => cosa.id === id);
        return retProd;
    }

    // elimina el producto del array de cosas y lo devuelve
    removeProduct(id: number): Product {
        const retProd = this.getProduct(id);
        remove(this.cosas, (cosa) => cosa.id === id);
        return retProd;
    }

    getSortedByPrice(order: passed) {
        return orderBy(this.cosas, "price", order);
    }
}

export { ListaDeProductos, Product };
