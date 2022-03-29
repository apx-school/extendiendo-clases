import * as fs from "fs";
import * as borrar from "lodash/remove";
import * as ordenar from "lodash/orderBy";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    return this.cosas.push(nuevaCosa);
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
    const lectArchJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const formjson = JSON.parse(lectArchJson);
    formjson.forEach((a) => this.addProduct(a));
  }
  addProduct(producto: Product) {
    return this.add(producto);
  }
  getProduct(id: number): Product {
    return this.cosas.find((item) => item.id == id);
  }
  removeProduct(id: number): Product {
    let eleguido = this.cosas.find((item) => item.id == id);
    return borrar(this.cosas, eleguido);
  }
  getSortedByPrice(order = "asc|des") {
    return ordenar(this.cosas, ["price"], order);
  }
}

function main() {}
main();

export { ListaDeProductos, Product };
