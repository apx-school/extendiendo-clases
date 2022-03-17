import * as fs from "fs"; //IMPORTO TODO (*) PORQUE FS NO TIENE EXPORT DEFAULT.
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

    const PRODUCTS_JSON = JSON.parse(fs.readFileSync(__dirname + "/products.json").toString());

    PRODUCTS_JSON.forEach( e => this.addProduct(e));
  }

  getProduct(id: number): Product {

    const COSAS = this.getCosas();

    return COSAS.find(e => e.id == id);
  }

  removeProduct(id: number) {
 
    remove(this.cosas, (c) => c.id == id);
  }

  getSortedByPrice(order: "asc" | "desc") {  //INDICO A TYPESCRIPT QUE SOLO PUEDO RECIBIR ESOS DOS STRINGS COMO PARAMETRO.

    return orderBy(this.cosas, ["price"], [order]);
  }

  addProduct(product: Product) {

    this.add(product);
  }
}

export { ListaDeProductos, Product };
