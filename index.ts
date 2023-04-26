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
    const productsBuffer = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const products = JSON.parse(productsBuffer);
    products.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(producto: Product) {
    const productoInvalido = this.cosas.find(function (item: Product): Boolean {
      return item.id === producto.id;
    });
    if (productoInvalido) {
      return null;
    } else {
      return this.add(producto);
    }
  }

  getProduct(id: number): Product {
    const resultado = this.cosas.find(function (item) {
      return item.id == id;
    });
    return resultado;
  }

  removeProduct(id: number): Product {
    const resultado = remove(this.cosas, function (item: Product) {
      return item.id == id;
    });
    return resultado;
  }

  getSortedByPrice(order: "asc" | "desc") {
    const resultado = orderBy(this.cosas, ["price"], order);
    return resultado;
  }
}

export { ListaDeProductos, Product };
