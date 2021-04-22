import * as products from "./products.json";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa: Product[]) {
    this.cosas = this.cosas.concat(nuevaCosa);
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
    super(name), this.addProduct(products);
  }
  addProduct(list) {
    this.add(list);
  }
  getProduct(id: number) {
    var cos = this.getCosas();
    return cos.find((r) => r.id == id);
  }
  removeProduct(id: number) {
    remove(this.cosas, (r) => r.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
