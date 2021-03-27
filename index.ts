import * as orderBy from "lodash/orderBy";
const fs = require("fs");

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

    let productosDelJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    let listaDeProductosJson = JSON.parse(productosDelJson);

    listaDeProductosJson.map((n) => this.addProduct(n));
  }

  agregarProductos(lista) {
    lista.forEach((element) => {
      this.addProduct(element);
    });
    return this.cosas;
  }
  addProduct(producto: Product) {
    let validar = this.cosas.findIndex(function (o) {
      return o.id == producto.id;
    });
    if (validar == -1) this.add(producto);
    else console.log("existe este ID");

    return this.cosas;
  }
  getProduct(id: number) {
    let productoEncontrado = this.cosas.find(function (o) {
      return o.id == id;
    });
    return productoEncontrado;
  }
  removeProduct(id: number) {
    let validar = this.cosas.findIndex(function (o) {
      return o.id == id;
    });

    if (validar == -1) console.log("No existe este Producto");
    else this.cosas.splice(validar, 1);
  }
  getSortedByPrice(order: string) {
    return orderBy(this.cosas, "price", order);
  }
}

export { ListaDeProductos, Product };
