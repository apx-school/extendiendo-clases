import * as fs from "fs";
import { dirname } from "node:path";
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
  stockProductos: Product[];
  constructor(name: string) {
    super(name);
    const stockProductos = JSON.parse(
      fs.readFileSync(__dirname + "/products.json").toString()
    );
    stockProductos.forEach((producto) => {
      this.addProduct(producto);
    });
  }

  addProduct(producto: Product) {
    let productoEncontrado = this.cosas.find((item) => {
      return producto.id == item.id;
    });
    if (!productoEncontrado) {
      //no usar aca productoEncontrad == undefined, usar !productoEncontrdo para definir que no lo encontrás
      this.add(producto);
    }
  }
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((item) => {
      return item.id == id;
    });
  }

  removeProduct(id: number) {
    remove(this.cosas, (item) => {
      return item.id == id;
    });
    return this.cosas;
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };

// function main() {
//   const listadoDeProductos = new ListaDeProductos("productos");
//   const procesadora = new Product("procesadora", 10, 1);
//   const batidora = new Product("batidora", 10, 2);
//   const lavarropas = new Product("lavarropas", 10, 6);
//   listadoDeProductos.addProduct(procesadora);
//   listadoDeProductos.addProduct(batidora);
//   listadoDeProductos.addProduct(lavarropas);
//   console.log(listadoDeProductos);
// }

// main();
