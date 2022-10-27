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

    const productsBuffer = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const products = JSON.parse(productsBuffer);

    products.forEach((x) => {
      this.addProduct(x);
    });
  }

  addProduct(product: Product) {
    return this.add(product);
  }
  getProduct(id: number): Product {
    return this.cosas.find((x) => x.id == id);
  }
  removeProduct(id: number): Product {
    return remove(this.cosas, (t) => t.id == id);
  }
  getSortedByPrice(order: string) {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
