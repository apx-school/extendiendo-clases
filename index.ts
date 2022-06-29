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
    //se suma en el constructor el parametro Name
    super(name);
    //se agrega el products.json , se los parsea
    const productJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();

    const productsArch = JSON.parse(productJson);

    productsArch.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(product: Product) {
    this.add(product);
  }
  //se genera el parametro para para ordenarlos por id
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((c) => c.id == id);
  }
  // se remueve los id que tiene el mismo valor utilizando Remove
  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id == id);
  }
  // se ordena los precios en forma decendente utilisando orderBy
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
