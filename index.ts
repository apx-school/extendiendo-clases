import * as remove from "lodash/remove";
import * as orderBy from "lodash/remove";
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
    const traerJson = fs.readFileSync(__dirname + "/products.json").toString();
    const parse = JSON.parse(traerJson);
    parse.forEach((i) => {
      this.addProduct(i);
    });
  }
  addProduct(add: Product) {
    this.add(add);
  }
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((a) => a.id == id);
  }
  removeProduct(id: number) {
    remove(this.cosas, (a) => a.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
