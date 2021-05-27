import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderby";

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
    const require = fs.readFileSync("products.json").toString();
    const parseo = JSON.parse(require);
    parseo.forEach((element) => {
      this.add(element);
    });
  }
  addProduct(producto: Product) {
    this.add(producto);
  }
  getProduct(id: number): Product {
    const productos = this.cosas;
    return productos.find((cosa) => cosa.id == id);
  }
  removeProduct(id: number): Product {
    const productoEncontrado = this.cosas.find((cosa) => cosa.id == id);
    return remove(this.cosas, productoEncontrado);
  }

  getSortedByPrice(order: string) {
    if (order == "asc") {
      return orderBy(this.cosas, ["price"], ["asc"]);
    } else {
      return orderBy(this.cosas, ["price"], ["desc"]);
    }
  }
}

export { ListaDeProductos, Product };
