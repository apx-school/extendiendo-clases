var orderBy = require("lodash.orderby");
var remove = require("lodash.remove");

import fs from "fs";

const archivoJson = fs.readFileSync(__dirname + "/products.json");
const listaProductos = archivoJson.toString();
const objetoProductos = JSON.parse(listaProductos);

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
  constructor(nombre: string) {
    // Llamada al constructor de la superclase
    super(nombre);

    // Lógica adicional para leer products.json y agregar productos usando addProduct
    // ...
    objetoProductos.forEach((e) => this.addProduct(e));

    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));
  }

  addProduct(product: Product): void {
    // Implementación del método addProduct
    // ...
    const existe = this.cosas.includes((e) => e.id);
    if (existe) {
      return;
    } else {
      this.add(product);
    }
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    // ...
    const cosas = this.getCosas();
    return cosas.find((e) => e.id == id);
  }

  removeProduct(id: number): Product {
    // Implementación del método removeProduct
    // ...
    remove(this.cosas, (e) => e.id == id);
    return;
  }

  getSortedByPrice(order: string): void {
    //getSortedByPrice(order: "asc" | "desc")
    // Implementación del método getSortedByPrice
    // ...
    if (order == "asc") {
      return orderBy(objetoProductos, ["price"], ["asc"]);
    } else {
      return orderBy(objetoProductos, ["price"], ["desc"]);
    }
  }
}

export { ListaDeProductos, Product };
