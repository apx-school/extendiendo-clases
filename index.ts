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
    const archivoJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelJson = JSON.parse(archivoJson);
    productosDelJson.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(product: Product) {
    this.add(product);
  }
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    const productoEncontrado = cosas.find((c) => c.id == id);
    return productoEncontrado;
  }
  removeProduct(id: number): Product {
    const arrayRemove = remove(this.cosas, (c) => c.id == id);
    return arrayRemove;
  }
  getSortedByPrice(order: "asc" | "desc") {
    const ordenado = orderBy(this.cosas, ["price"], [order]);
    return ordenado;
  }
}

export {ListaDeProductos, Product};
