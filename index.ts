import * as fs from 'fs';
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

    const productsFile = fs
      .readFileSync(__dirname + "/products.json")
      .toString()
    const products = JSON.parse(productsFile);

    products.forEach((product: Product) => this.addProduct(product));
  }

  addProduct(product: Product) {
    this.add(product);
  }
  getProduct(id: number): Product {
    const list = this.getCosas();
    return list.find((product: Product) => product.id == id);
  }
  removeProduct(id: number) {
    return remove(this.cosas, product => product.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    const lista = this.getCosas()
    return orderBy(lista, ['price'], [order])
  }
}


export { ListaDeProductos, Product };