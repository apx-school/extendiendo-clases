import * as prducti from "./products.json";
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

    prducti.forEach((a) => {
      this.addProduct(a);
    });
  }
  addProduct(product: Product) {
    this.add(product);
  }
  getProduct(id: number): Product {
    const product = this.getCosas();
    return product.find((c) => c.id == id);
  }
  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id == id);
  }
  getSortedByPrice(order: "desc" | "asc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
