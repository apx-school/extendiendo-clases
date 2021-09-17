import * as fs from "fs";
import * as remove from "lodash/remove";
import { type } from "os";
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
    var data: any = fs.readFileSync(__dirname + "/products.json").toString();
    var todosLosProductos = JSON.parse(data);
    todosLosProductos.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(producto: Product) {
    var productoValidado = this.cosas.find((p) => {
      if (p.id == producto.id) {
        return producto;
      }
    });
    if (productoValidado != producto) {
      this.add(producto);
    }
  }
  getProduct(id: number): Product {
    var productoSeleccionado = this.cosas.find((p) => {
      if (p.id == id) {
        return p;
      }
    });
    return productoSeleccionado;
  }
  removeProduct(id: number): Product {
    var productoARemover = this.cosas.find((p) => {
      if (p.id == id) {
        return p;
      }
    });
    return remove(this.cosas, productoARemover);
  }
  getSortedByPrice(order: string) {
    type order = "asc" | "desc";
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
