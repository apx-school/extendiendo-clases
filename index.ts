import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderby from "lodash/orderby";

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
    const archivoStringueado = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelArchivo = JSON.parse(archivoStringueado);
    // ahora tengo el archivo (en .js) y necesito
    // leerlo e iterarlo y cada posicion añadirla
    productosDelArchivo.forEach((element) => {
      this.addProduct(element);
    });
  }
  addProduct(instancia: Product) {
    this.add(instancia);
  }
  getProduct(id: number) {
    return this.cosas.find((x) => x.id == id);
  }
  removeProduct(id: number) {
    remove(this.cosas, (x) => x.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderby(this.cosas, ["price"], order);
  }
}

export { ListaDeProductos, Product };
