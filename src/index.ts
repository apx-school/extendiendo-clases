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
    return this.cosas; // .map((p) => ({ id: p.id, name: p.name, price: p.price }));
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
    products.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product {
    return this.cosas.find((p) => p.id == id);
  }

  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id == id);
  }

  getSortedByPrice(order: "asc" | "desc"): void {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
