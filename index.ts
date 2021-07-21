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

//Arreglar
class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    super(name);
    const listaJson = fs.readFileSync(__dirname + "/products.json").toString();
    const listaParseada = JSON.parse(listaJson);
    listaParseada.forEach((x) => {
      this.addProduct(x);
    });
  }

  addProduct(products: Product) {
    this.add(products);
  }

  getProduct(id: number): Product {
    const obj = this.getCosas();
    return obj.find((x) => x.id == id);
  }

  removeProduct(id: number) {
    remove(this.cosas, (x) => x.id == id);
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.getCosas(), ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
