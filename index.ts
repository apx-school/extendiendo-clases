var remove = require("lodash.remove");
var orderBy = require("lodash.orderby");
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

    const contenidoDelArchivo = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const PorductosDelArchivo = JSON.parse(contenidoDelArchivo);

    PorductosDelArchivo.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(product: Product) {
    return this.add(product);
  }

  getProduct(id: number) {
    return this.cosas.find((c) => c.id == id);
  }

  removeProduct(id: number) {
    return remove(this.cosas, (n) => (n.id = id));
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], order);
  }
}

export { ListaDeProductos, Product };
