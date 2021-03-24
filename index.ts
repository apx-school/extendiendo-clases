import * as fs from "fs";
import * as _ from "lodash";

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
    const productosDelArchivo = JSON.parse(
      fs.readFileSync(__dirname + "/products.json").toString()
    );
    _.forEach(productosDelArchivo, (prod: Product) => {
      this.addProduct(prod);
    });
  }

  addProduct(pr: Product) {
    const prId = pr.id;
    if (!_.some(this.cosas, { id: prId })) {
      this.add(pr);
    }
  }

  getProduct(id: number): Product {
    return _.find(this.cosas, function (product: Product) {
      return product.id == id;
    });
  }

  removeProduct(id: number) {
    return _.remove(this.cosas, (c) => c.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    if (order == "asc") {
      return _.sortBy(this.cosas, ["price"]);
    }
    if (order == "desc") {
      return _.reverse(_.sortBy(this.cosas, ["price"]));
    }
    return this.cosas;
  }
}

export { ListaDeProductos, Product };
