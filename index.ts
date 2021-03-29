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
  addProduct(product: Product) {
    this.add(product);
  }
  constructor(name: string) {
    super(name);

    const contenidoArchivo = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelArchivo = JSON.parse(contenidoArchivo);

    productosDelArchivo.forEach((p) => {
      this.addProduct(p);
    });
  }

  getProduct(id: number) {
    const cosas = this.getCosas();
    return cosas.find((c) => {
      return c.id == id;
    });
  }
  removeProduct(id: number) {
    remove(this.cosas, (n) => n.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
