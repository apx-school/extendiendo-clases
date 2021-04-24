import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

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

class ListaDeProductos extends ListaDeCosas {
    // Método constructor con la llamada al constructor de la superclase
    constructor(name: string) {
        super(name);

        // Ahora, leo el JSON con los productos
        const datosDelJSON = fs
            .readFileSync(__dirname + "/products.json")
            .toString();
        const coleccionProductos = JSON.parse(datosDelJSON);

        // Bien, ahora recorro la colección y voy agregando a la lista de cosas con el método addproduct
        coleccionProductos.forEach((item) => {
            this.addProduct(item);
        });
    }

    // Método para agregar un producto a la lista
    addProduct(producto: Product) {
        this.add(producto);
    }

    // Método para obtener un producto por id
    getProduct(id: number): Product {
        return this.cosas.find((item) => item.id == id);
    }

    // Método para borrar un producto de la lista, con un id especifico
    removeProduct(id: number) {
        remove(this.cosas, (cosa) => cosa.id == id);
    }

    // Método para ordenar por precio según se pida
    getSortedByPrice(order: "asc" | "desc") {
        // ordeno con una función de lodash
        return orderBy(this.cosas, ["price"], [order]);
    }
}

export { ListaDeProductos, Product };
