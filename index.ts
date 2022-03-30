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
    const contentJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const parsedJson = JSON.parse(contentJson);
    const eachedJson = parsedJson.forEach((i) => {
      this.addProduct(i);
    });
  }
  addProduct(product: Product) {
    return this.add(product);
  }
  getProduct(id: number): Product {
    const foundProduct = this.cosas.find((i) => i.id == id);
    return foundProduct;
  }
  removeProduct(id: number) {
    const removedProduct = remove(this.cosas, (p) => p.id == id);
    return removedProduct;
  }
  getSortedByPrice(order: string) {
    const sortedProducts = orderBy(this.cosas, ["price"], [order]);
    return sortedProducts;
  }
}

export { ListaDeProductos, Product };
