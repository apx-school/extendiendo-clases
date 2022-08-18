import * as includes from "lodash/includes";
import * as remove from "lodash/remove";
import * as sortBy from "lodash/sortBy";
import * as products from "./products.json";

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
  productos: Product[] = this.cosas;
  addProduct(producto: Product) {
    this.add(producto);
  }

  constructor(name: string) {
    super(name);
    products.forEach((item) => this.addProduct(item));
  }

  getProduct(id: number): Product {
    return this.productos.find((item) => item.id == id);
  }

  removeProduct(id: number) {
    remove(this.productos, (item) => item.id == id);
  }

  getSortedByPrice(order: string) {
    if (order == "asc") {
      return sortBy(this.productos, (item) => item.price);
    }
    if (order == "desc") {
      sortBy(this.productos, (item) => item.price);
      return this.productos.reverse();
    }
  }
}

export { ListaDeProductos, Product };
