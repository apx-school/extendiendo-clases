import * as fs from "fs"
import * as remove from "lodash/remove"
import * as orderBy from "lodash/orderBy";

var archivo = fs.readFileSync("./products.json")
var products = JSON.parse(archivo.toString())

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
    this.cosas = products
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
    return this.cosas
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
    super(name)
  }
  addProduct(producto: Product) {
    var checkId = products.some(product => product.id == producto.id)
    var res = () => {
      if (checkId == true) {
        return "ERROR! ID YA EXISTENTE"
      } else {
        super.add(producto)
        return this.cosas
      }
    }
    return res()
  }
  getProduct(id: number): Product{
    return products.find(producto => producto.id === id) 
  }
  removeProduct(id: number): Product {
    var theProduct = products.find(producto => producto.id === id)
    return remove(this.cosas, theProduct)
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], order)
  }
}

export { ListaDeProductos, Product };
