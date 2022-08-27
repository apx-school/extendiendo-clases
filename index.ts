import * as fs from "fs";
import * as remov from "lodash/remove";
import * as orderBy from "lodash/orderBy";
import { json } from "stream/consumers";

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
  addProduct(product: Product) {
    this.add(product);
  }
  constructor(name: string) {
    super(name);
    const readArchive = fs.readFileSync("products.json");
    const parseArchiv = JSON.parse(readArchive.toString());
    const addAllProd = parseArchiv.forEach((element) => {
      this.addProduct(element);
    });
    return addAllProd;
  }

  getProduct(id: number): Product {
    const prodEncontrado = this.cosas.find((item) => item.id == id);
    return prodEncontrado;
  }

  removeProduct(id: number): Product {
    const removerProducto = remov(this.cosas, (item) => item.id == id);
    return removerProducto;
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], order);
  }
}

export { ListaDeProductos, Product };
