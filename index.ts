import { get } from "https";

const fs = require("fs")
const _ = require("lodash")
// import * as lodash from "lodash/"
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
  constructor (name: string){
    super (name);
    const productsJson = fs
    .readFileSync(__dirname + "/products.json")
    .toString()
    const productos = JSON.parse(productsJson);
    
    productos.forEach((prod) => {
      this.addProduct(prod)
    });
    }
    addProduct (product: Product) {
          this.add(product);
        }
  getProduct (id:number): Product {
    const productos = this.getCosas()
    return productos.find((producto) => producto.id == id);
  }
  removeProduct (id:number) {
  _.remove(this.cosas, (producto) => producto.id == id)
  return this.cosas;
}
getSortedByPrice(order:"asc" | "desc") {
  const productosOrdenados = _.orderBy (this.cosas, ["price"], [order])
  return productosOrdenados;
}
}

export { ListaDeProductos, Product };
