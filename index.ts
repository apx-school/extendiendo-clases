import * as remove from "./node_modules/lodash/remove"
import * as orderBy from "./node_modules/lodash/orderBy"
import * as fs from "fs"
import { isMapIterator } from "util/types";
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
  addProduct(product:Product) {
    const buscar = this.cosas.find(item => item.id == product.id)
    if(buscar == undefined) {
      this.add(product)
    }
  }
  products:Product[]
  constructor(name:string, products:Product[]) {
    super(name);
    const productosJSON = fs.readFileSync(__dirname + "/products.json").toString();
    const productosDelArchivo = JSON.parse(productosJSON)
    productosDelArchivo.forEach((item) => {
      this.addProduct(item)
    })
  }
  getProduct(id:number):Product {
    const cosas = this.getCosas()
    return cosas.find((item) => item.id == id)
  }
  removeProduct(id:number) {
    remove(this.cosas, (item) => item.id == id)
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order])
  }
}

export { ListaDeProductos, Product };
