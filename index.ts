import * as fs from "fs";
import * as productosJSON from "./products.json";
import * as remove from "lodash/remove";
import * as ordenarPor from "lodash/orderBy";
const jsonParse = JSON.parse(fs.readFileSync("./products.json").toString());

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
    jsonParse.forEach((i) => {
      this.addProduct(i);
    });
  }
  addProduct(Producto: Product) {
    this.add(Producto);
  }
  getProduct(id: number): Product {
    return this.cosas.find(function (item) {
      return item.id == id;
    });
  }
  removeProduct(id: number): any {
    return remove(this.cosas, function (n) {
      return n.id == id;
    });
  }
  getSortedByPrice(order: string = "asc" || "desc"): Product[] {
    if (order == "asc") {
      return ordenarPor(this.cosas, ["price"], ["asc"]);
    }
    if (order == "desc") {
      return ordenarPor(this.cosas, ["price"], ["desc"]);
    }
  }
}

export { ListaDeProductos, Product };
