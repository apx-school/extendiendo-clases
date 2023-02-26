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
    const prodDelJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelArchivo = JSON.parse(prodDelJson);
    productosDelArchivo.forEach((element) => {
      this.addProduct(element);
    });
  }
  addProduct(prod: Product) {
    return this.add(prod);
  }
  getProduct(id: number): Product {
    const resp = this.cosas.find((p) => {
      return p.id == id;
    });
    return resp;
  }
  removeProduct(id: number) {
    return remove(this.cosas, (i: Product) => i.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
