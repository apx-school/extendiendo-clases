import * as fs from "fs";
import * as _ from "lodash";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
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
    const productosJson = fs.readFileSync("./products.json").toString();
    const productosParceados = JSON.parse(productosJson);
    productosParceados.forEach((item: Product) => {
      this.addProduct(item);
    });
  }
  addProduct(product: Product) {
    this.add(product);
  }

  getProduct(id: number) {
    return _.find(this.cosas, function (item: Product) {
      return item.id == id;
    });
  }

  removeProduct(id: number) {
    return _.remove(this.cosas, function (item: Product) {
      return item.id == id;
    });
  }

  getSortedByPrice(order: "asc" | "desc") {
    if (order == "asc") {
      return _.orderBy(this.cosas, ["price"], ["asc"]);
    }
    if (order == "desc") {
      return _.orderBy(this.cosas, ["price"], ["desc"]);
    }
  }
}

export { ListaDeProductos, Product };
