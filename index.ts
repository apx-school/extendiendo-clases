import * as products from "./products.json";
import * as lodash from "lodash";
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
    products.map((i) => this.addProduct(i));
  }
  addProduct(product: Product): void {
    if (!this.cosas.find((i) => i.id === product.id)) {
      this.add(product);
    }
  }
  getProduct(id: number): Product {
    return this.cosas.find((i) => i.id === id);
  }
  removeProduct(id: number): Product {
    const product = this.cosas.find((i) => i.id === id);
    // this.cosas = lodash.remove(this.cosas, (i) => i.id == id);
    this.cosas = this.cosas.filter((i) => i.id !== id);
    return product;
  }
  getSortedByPrice(order: string) {
    return lodash.orderBy(this.cosas, "price", order);
  }
}

export { ListaDeProductos, Product };
