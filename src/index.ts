import products from "./products.json";
import { orderBy, remove } from "lodash";

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
    products.forEach((p) => this.addProduct(p));
  }

  addProduct(product: Product) {
    this.add(product);
  }

  getProduct(id: number) {
    const prods = this.getCosas();
    const filter = prods.filter((p) => p.id == id)[0];
    return filter;
  }

  removeProduct(id: number) {
    const prods = this.getCosas();
    return remove(prods, (p) => p.id == id);
  }

  getSortedByPrice(type: string = "desc") {
    const prods = this.getCosas();
    return orderBy(prods, ["price"], [type]);
  }
}

export { ListaDeProductos, Product };
