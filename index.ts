import {mainModule} from "process";
import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
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
    const productJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const listaLista = JSON.parse(productJson);
    listaLista.forEach((element) => {
      this.addProduct(element);
    });
  }
  addProduct(product) {
    this.add(product);
  }
  getProduct(id: number): Product {
    const cosas = this.cosas;
    return cosas.find((cosa) => cosa.id == id);
  }
  removeProduct(id: number): Product {
    const remover = remove(this.cosas, (cosa) => cosa.id == id);
    return remover;
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

function main() {}

main();

export {ListaDeProductos, Product};
