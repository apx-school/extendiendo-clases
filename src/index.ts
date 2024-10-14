import * as fs from "fs";
import { remove } from "lodash";
import { orderBy } from "lodash";

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
    const jsonImportado = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productoArchivo = JSON.parse(jsonImportado);
    productoArchivo.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(producto: Product) {
    this.add(producto);
  }
  getProduct(id: number) {
    const cosas = this.getCosas();
    return cosas.find((p) => p.id == id);
  }
  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
