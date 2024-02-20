import products from './products.json';

class ListaDeCosas {
    name: string;
    cosas: any = [];

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
        this.cosas = [...products];
    }

    addProduct(newProduct: Product) {
        this.add(newProduct);
    }

    getProduct(id: number): Product {
        return this.cosas.find((product: Product) => product.id === id);
    }

    removeProduct(id: number) {
        this.cosas = this.cosas.filter((product: Product) => product.id !== id);
    }

    getSortedByPrice(order: "asc" | "desc") {
        return this.cosas.sort((a: Product, b: Product) => {
            if (order === "asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }

}

export {ListaDeProductos, Product};
