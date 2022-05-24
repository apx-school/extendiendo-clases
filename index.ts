let fs = require("fs");
import * as remove from "lodash/remove";
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
    const productos = JSON.parse(fs.readFileSync(__dirname + "/products.json"));
    productos.forEach((i) => {
      this.addProduct(i);
    });
  }
  addProduct(producto: Product) {
    if (
      this.cosas.find((i) => {
        return i.id == producto.id;
      })
    ) {
      return;
    }
    this.add(producto);
  }
  getProduct(id: number): Product {
    const result: Product = this.cosas.find((i) => {
      return i.id == id;
    });
    return result;
  }
  removeProduct(id: number): Product {
    const result = remove(this.cosas, (i) => {
      return i.id == id;
    });
    return result;
  }
  getSortedByPrice(order: string) {
    var result = this.cosas.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
    if (order == "desc") {
      result = reverse(result);
    }
    return result;
  }
}

export { ListaDeProductos, Product };
