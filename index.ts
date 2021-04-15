import * as fs from "fs";
import * as some from "lodash/some";
import * as find from "lodash/find";
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
    //acomodar
    let readFile = fs.readFileSync(__dirname + "/products.json").toString();
    let fileParsed = JSON.parse(readFile);
    fileParsed.map((e: Product) => this.addProduct(e));
  }
  addProduct(newProduct: Product) {
    if (some(this.cosas, ["id", newProduct.id])) {
      throw "Este producto ya existe";
    } else {
      this.add(newProduct);
    }
  }
  getProduct(id: number): Product {
    return find(this.cosas, ["id", id]);
  }
  removeProduct(id: number): Product {
    return remove(this.cosas, ["id", id]);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
