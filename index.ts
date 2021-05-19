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
    const bufferProducts = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const parseProducts = JSON.parse(bufferProducts);
    parseProducts.forEach((obj) => {
      this.add(obj);
    });
  }
  addProduct(instanciaProduct: Product) {
    this.add(instanciaProduct);
  }
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find(function (obj) {
      return obj.id == id;
    });
  }
  removeProduct(id: number): Product {
    const cosas = this.getCosas();
    return remove(cosas, function (obj) {
      return obj.id == id;
    });
  }
  getSortedByPrice(order: "asc" | "desc") {
    const product = this.getCosas();
    return orderBy(product, ["id", "price"], [order, order]);
  }
}

export { ListaDeProductos, Product };
