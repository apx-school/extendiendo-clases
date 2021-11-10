import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

function getAll() {
  return JSON.parse(fs.readFileSync(__dirname + "/products.json").toString());
}

class ListaDeCosas {
  name: string;
  cosas: Product[] = [];
  constructor(name: string) {
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
    this.cosas = getAll();
  }
  addProduct(product: any) {
    this.cosas.forEach((producto) => {
      if (!(producto.id == product.id)) {
        this.add(product);
      }
    });
  }
  getProduct(id: number) {
    return this.cosas.find((producto) => {
      if (producto.id == id) {
        return producto;
      }
    });
  }
  removeProduct(id: number) {
    remove(this.cosas, (producto) => {
      return producto.id == id;
    });
  }
  getSortedByPrice(order: string) {
    type order = "asc" | "desc";
    return orderBy(this.cosas, ["price"], order);
  }
}

export { ListaDeProductos, Product };
