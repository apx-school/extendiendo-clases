import * as fs from "fs";
import * as orderBy from "lodash/orderBy";
import * as remove from "lodash/remove";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa: any) {
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
    const contenidoDelArchivo = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelArchivo = JSON.parse(contenidoDelArchivo);

    productosDelArchivo.forEach((p) => {
      this.addProduct(p);
    });
    //console.log(productosDelArchivo);
  }

  addProduct(productoNuevo: Product) {
    return this.add(productoNuevo);
  }

  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((c) => {
      c.id == id;
    });
  }

  removeProduct(id: number) {
    const product = this.getCosas().find((prod) => prod.id === id);
    const index = this.getCosas().indexOf(product);
    return this.getCosas().splice(index, 1);
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
