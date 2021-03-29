import * as fs from "fs";
import * as pull from "lodash/pull";
import * as reverse from "lodash/reverse";
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
    const archivoBruto = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const cosas: Product[] = JSON.parse(archivoBruto);
    cosas.forEach((i) => this.addProduct(i));
  }

  addProduct(item: Product) {
    const existe: boolean = this.cosas.includes(item.id);
    if (existe == false) {
      this.add(item);
    } else console.log("El producto ya se encuentra en la lista.");
  }

  getProduct(id: number): Product {
    const itemEncontrado: Product = this.cosas.find((i) => i.id == id);
    return itemEncontrado;
  }

  removeProduct(id: number): Product {
    const item = this.getProduct(id);
    const productoRemovido: Product = pull(this.cosas, item);
    console.log("Elementos eliminados:");
    return productoRemovido;
  }

  getSortedByPrice(order: "asc" | "desc") {
    const listaOrdenada = orderBy(this.cosas, ["price"], [order]);
    return listaOrdenada;
  }
}

export { ListaDeProductos, Product };
