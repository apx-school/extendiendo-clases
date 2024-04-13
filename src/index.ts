import * as _ from "lodash";
import { listenerCount } from "process";
const products = require("./products.json");

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
  productos: object[];

  constructor(name: string) {
    super(name);
    const productsJson = products;

    productsJson.forEach((element) => {
      this.addProduct(element);
    });
  }
  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product {
    return this.getCosas().find((p) => p.id == id);
  }
  removeProduct(id: number): Product | undefined {
    const index = _.findIndex(this.cosas, (p) => p.id == id);
    if (index !== 1) {
      return this.cosas.splice(index, 1)[0];
    }
    return undefined;
  }
  getSortedByPrice(order: "asc" | "desc") {
    return _.orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
