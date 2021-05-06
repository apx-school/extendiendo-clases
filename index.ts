import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderby from "lodash/orderBy";

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

    const products = JSON.parse(
      fs.readFileSync(__dirname + "/products.json").toString()
    );

    products.forEach((prod) => {
      this.addProduct(prod);
    });
  }

  addProduct(products: Product) {
    return this.add(products);
  }

  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((cosas) => cosas.id == id);
  }

  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id == id);
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderby(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
