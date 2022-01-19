import * as fs from "fs";
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
  getProduct(id: number): Product {
    return this.cosas.find((p) => p.id === id);
  }
  removeProduct(id: number): Product {
    let aux;
    this.cosas.find((p, i) => {
      if (p.id === id) {
        aux = p;
        this.cosas.splice(i, 1);
      }
    });
    return aux;
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, "price", order);
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
    let rawData = fs.readFileSync("products.json").toString();
    let products = JSON.parse(rawData);
    products.forEach((p) => this.addProduct(p));
  }
  addProduct(product: Product) {
    let products = this.getCosas();
    const existeProduct = products.find((p) => {
      if (p.id == product.id) {
        return true;
      }
    });
    if (!existeProduct) {
      this.add(product);
    }
  }
}

export { ListaDeProductos, Product };
