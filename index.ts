import * as fs from "fs";
import * as remove from "lodash/remove";
import * as ordertBy from "lodash/orderBy";
import * as reverse from "lodash/reverse";

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

    const contenidoDelJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelJson = JSON.parse(contenidoDelJson);
    productosDelJson.forEach((item) => this.addProduct(item));
  }
  addProduct(newProduct: Product) {
    var yaExiste: boolean;
    if (this.cosas.find((item) => item == newProduct)) {
      yaExiste = true;
    } else {
      yaExiste = false;
    }
    if (yaExiste == false) {
      this.add(newProduct);
    }
  }
  getProduct(id: number): Product {
    const productoEnconstrado = this.cosas.find((item) => item.id == id);
    return productoEnconstrado;
  }
  removeProduct(id: number) {
    remove(this.cosas, (item) => item.id == id);
  }
  getSortedByPrice(order: string) {
    const listaOrdenada = ordertBy(this.cosas, "price", order);
    return listaOrdenada;
  }
}

export { ListaDeProductos, Product };
