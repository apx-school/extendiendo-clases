import * as fs from "fs";
import _ from "lodash";
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
  productJson: any[];
  constructor(name: string) {
    super(name);
    const prodOfJson = fs.readFileSync(__dirname + "/products.json").toString();
    this.productJson = JSON.parse(prodOfJson);
  }
  getCosas(): any[] {
    return this.productJson;
  }
  addProduct(product: Product) {
    const exist = this.productJson.some((p) => p.id === product.id);
    exist ? "Este producto ya exite" : this.productJson.push(product);
    return this.getCosas();
  }
  getProduct(id: number): Product {
    return this.productJson.find((p) => p.id === id);
  }
  removeProduct(id: number): Product[] {
    this.productJson = this.productJson.filter((p) => p.id !== id);
    return this.getCosas();
  }
  getSortedByPrice(order: string): void {
    const orders = _.orderBy(this.cosas, order, "desc");
    return orders;
  }
}

export { ListaDeProductos, Product };
