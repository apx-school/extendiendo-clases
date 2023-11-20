import { dir } from "console";
import { readFile } from "fs/promises";
import { dirname } from "path";

import * as fs from "fs";
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
    const productsJson = fs
      .readFileSync(__dirname + "products.json")
      .toString();
    const productosDelArchivo = JSON.parse(productsJson);
    productosDelArchivo.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(productoNuevo: Product) {
    return this.add(productoNuevo);
  }

  getProduct(id: number): Product {
    return this.getCosas().find((prod) => prod.id === id);
  }

  removeProduct(id: number) {
    const product = this.getCosas().find((prod) => prod.id === id);
    const index = this.getCosas().indexOf(product);
    return this.getCosas().splice(index, 1);
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
