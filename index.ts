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
  constructor(name: string) {
    super(name);
    const archivoDelJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const archivoParseado = JSON.parse(archivoDelJson);
    archivoParseado.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(producto: Product) {
    this.add(producto);
  }
  getProduct(id: number) {
    const productoBuscado = this.cosas.find((p) => {
      return p.id == id;
    });
    return productoBuscado;
  }
  removeProduct(id: number) {
    const array = remove(this.cosas, (c) => {
      return c.id == id;
    });
  }
  getSortedByPrice(order: "desc" | "asc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
