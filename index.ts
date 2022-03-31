import * as fs from "fs";
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
  lista: Product[] = [];
  products: any;

  constructor(name: string) {
    super(name);
    const traerJson = fs.readFileSync(__dirname + "/products.json").toString();
    const parse = JSON.parse(traerJson);
    parse.forEach((i) => {
      this.addProduct(i);
    });
  }

  addProduct(producto: Product) {
    this.add(producto);
  }
  getProduct(id: Number): Product {
    const cosas = this.getCosas();
    return cosas.find((cosa) => cosa.id == id);
  }

  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}


export { ListaDeProductos, Product };
