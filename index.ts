import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

const fs = require("fs");

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

    const products = JSON.parse(fs.readFileSync(__dirname + "/products.json"));

    products.forEach((p) => this.addProduct(p));
  }

  addProduct(newProduct: Product) {
    if (this.cosas.find((p) => p.id == newProduct.id)) {
    } else {
      this.add(newProduct);
    }
  }

  getProduct(id: number): Product {
    return this.cosas.find((p) => p.id == id);
  }

  removeProduct(id: number): Product {
    return remove(this.cosas, function (p) {
      return p.id == id;
    });
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
