import *as _ from "lodash";
import *as fs from "fs"

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
  constructor(name) {
    super(name);
    const fs = require("fs");
    const contenidoDelArchivo = fs
       .readFileSync(__dirname + "/products.json")
       .toString();
    const productosDelArchivo = JSON.parse(contenidoDelArchivo);
    productosDelArchivo.forEach((p) => {
      this.add(p)
    });
  }

  addProduct(producto: Product) {
    if(!this.cosas.includes(producto)) {
      this.add(producto);
    }
  }

  getProduct(id: number): Product {
    let cosas = this.getCosas()
    return cosas.find(x => x.id == id);
  }

  removeProduct(id: number) {
    _.remove(this.cosas, (item) => item.id === id)
  }

  getSortedByPrice(order: "asc" | "desc") {
    return _.orderBy(this.cosas,["price"], [order]);
  }
}

export { ListaDeProductos, Product };
