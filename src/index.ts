import * as fs from "fs";
import { orderBy, remove } from "lodash";

const productsJSON = fs.readFileSync(__dirname + "./products.json").toString();
const products = JSON.parse(productsJSON);

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
  addProduct(product: Product): void {
    if (!this.cosas.some((x) => x.id === product.id)) {
      this.add(product);
    }
  }
  constructor(name: string) {
    super(name);
    products.forEach((element) => {
      this.addProduct(element);
    });
  }
  getProduct(id: number): Product[] {
    const foundProduct = products.find((product) => product.id === id);
    return foundProduct;
  }
  removeProduct(id: number) {
    remove(products, (x) => x.id === id);
  }
  getSortedByPrice(order: string) {
    return orderBy(products, order);
  }
}

export { ListaDeProductos, Product };
