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
    // carga los productos desde un archivo JSON
    const products = JSON.parse(fs.readFileSync(__dirname + "/products.json").toString());
    products.forEach((p) => {
      this.addProduct(p);
    });
  }
  // agrega un producto a la lista
  addProduct(product: Product) {
    return this.add(product);
  }
  // obtiene un producto específico por su id
  getProduct(id: number): Product {
    return this.cosas.find((product) => product.id === id);
  }
  // elimina un producto por su id
  removeProduct(id: number): Product {
    return remove(this.cosas, (p) => p.id == id);
  }
  // obtiene la lista de productos ordenada por precio en orden ascendente o descendente
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
