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
  constructor(name) {
    super(name);
    const readProduc = fs.readFileSync(__dirname + "/products.json").toString();
    const products = JSON.parse(readProduc);
    products.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(producto: Product) {
    if (
      this.cosas.find((p) => {
        p == producto;
      })
    ) {
      return null;
    } else {
      this.add(producto);
    }
  }

  getProduct(id: number): Product {
    return this.cosas.find((p) => p.id == id);
  }

  removeProduct(id: number): Product {
    return remove(this.cosas, (n) => n.id == id);
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
