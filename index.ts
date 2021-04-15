import * as lodashFind from "lodash/find";
import * as lodashPull from "lodash/pull";
import * as lodashSortBy from "lodash/sortBy";
import * as lodashReverse from "lodash/reverse";
import * as fs from "fs";

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

    const productos = fs.readFileSync("products.json").toString();
    const productosParseados = JSON.parse(productos);

    productosParseados.forEach((element) => {
      this.addProduct(element);
    });
  }

  addProduct(producto: Product) {
    if (lodashFind(this.cosas, (i) => i.id == producto.id) == undefined) {
      this.cosas.push(producto);
    }
  }
  getProduct(id: number): Product {
    return this.cosas.find((i) => i.id == id);
  }
  removeProduct(id: number): Product {
    const productoRemovido = this.cosas.find((i) => i.id == id);
    lodashPull(this.cosas, productoRemovido);
    return productoRemovido;
  }
  getSortedByPrice(order: "asc" | "desc") {
    if (order == "asc") {
      return lodashSortBy(this.cosas, "price");
    } else {
      return lodashReverse(lodashSortBy(this.cosas, "price"));
    }
  }
}

export { ListaDeProductos, Product };
