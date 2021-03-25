import * as fs from "fs"
import * as _ from "lodash"

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
  constructor(name) {
    super(name)
    let propString = fs.readFileSync(__dirname + "/products.json")
      .toString();
    let propFinal = JSON.parse(propString);
    propFinal.map(p => this.addProduct(p));
  }

  addProduct(prod: Product) {
    this.add(prod);
  }

  getProduct(id: number) {
    return this.cosas.find(p => p["id"] == id);
  }

  removeProduct(id: number) {
    return _.remove(this.cosas, (p => p["id"] == id));
  }

  getSortedByPrice(by:"asc" | "desc"){
    if(by == "asc"){
     return this.cosas.sort((a,b) => a.price - b.price)
    }
    if(by == "desc"){
     return this.cosas.sort((a,b) => b.price - a.price)
    }
  }

}

export { ListaDeProductos, Product };