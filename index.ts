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
    this.cosas.concat(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(id: number, name: string, price: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    super(name);

    const contenidoArchivo = fs.readFileSync(__dirname + "/products.json");
    const a = contenidoArchivo.toString();
    const productosDelArchivo = JSON.parse(a);

    productosDelArchivo.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(product: Product) {
    this.add(product);
  }
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((c) => {
      c.id == id;
    });
  }
  removeProduct(id: number) {
    remove(this.cosas, (n) => n.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
