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
    const archivo = fs.readFileSync(__dirname + "/products.json").toString();
    const listaDeProductos = JSON.parse(archivo);
    listaDeProductos.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(producto: Product) {
    const idEncontrado = this.cosas.find((p) => p.id === producto.id);
    if (!idEncontrado) {
      return this.add(producto);
    }
  }

  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((p) => p.id === id);
  }

  removeProduct(id: number) {
    // this.cosas = this.cosas.filter((p) => p.id !== id);
    // return this.cosas;

    remove(this.cosas, (p) => p.id == id);
  }

  getSortedByPrice(order: "asc" | "desc") {
    //   if (order === "asc")
    //     return this.cosas.sort((a, b) => (a.price > b.price ? 1 : -1));
    //   if (order === "desc")
    //     return this.cosas.sort((a, b) => (a.price < b.price ? 1 : -1));
    // }
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos };
