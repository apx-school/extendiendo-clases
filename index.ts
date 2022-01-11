import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";
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

    const archivosDelProducts = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const archivosDelProductsJSON = JSON.parse(archivosDelProducts);
    archivosDelProductsJSON.forEach((objeto) => {
      this.addProduct(objeto);
    });
  }
  addProduct(product) {
    this.add(product);
  }
  getProduct(id: number) {
    return this.cosas.find((item) => {
      return item.id == id;
    });
  }
  removeProduct(id: number) {
    remove(this.cosas, function (obj) {
      return obj.id == id;
    });
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
