import * as _ from "lodash";
import * as products from "./products.json";

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
        products.forEach(element => {
          this.addProduct(element);
        });
    }
    addProduct(producto: Product) {
        const resultado = _.find(this.cosas, { id: producto.id });
        if (!resultado) {
            this.cosas.push(producto);
        }
    }
    getProduct(id: number): Product {
        const resultado = _.find(this.cosas, { id: id });
        return resultado;
    }
    removeProduct(id: number) {
        _.remove(this.cosas, { id: id });
    }
    getSortedByPrice(order: "asc" | "desc") {
        const resultado = _.orderBy(this.cosas, ["price"], order);
        return resultado;
    }
}

export { ListaDeProductos, Product };
