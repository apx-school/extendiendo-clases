import * as lodash from "lodash";
// const products = require("./products.json");
import * as productos from "./products.json";
import * as fs from "fs";
import { privateDecrypt } from "crypto";


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
  addProduct(producto: Product){
    this.cosas.find(function (p) {
      if (p.id === producto.id){
        throw "repeated ID";  // cambiarlo?
      } else {
        // .add(producto);
      }
    });
  };
  constructor(name: string){
    super(name);
    const texto = fs.readFileSync(__dirname + "/products.json");
    const textoParseado = JSON.parse(texto);
    this.addProduct(textoParseado);
  }
  getProduct(id:number): Product{
    // this.cosas.find((p)=> p.id === id)
    const productoEncontrado = this.cosas.find(function(p) {
      if (p.id === id){
        return p;
      }
    })
    return productoEncontrado;
  };
  removeProduct(id:number): Product{
    const productoEncontrado2 = this.cosas.find((p)=> p.id === id);
    return lodash.remove(productoEncontrado2); 
  };
  getSortedByPrice(order: "asc" | "desc"){
    this.cosas.sort(function (a, b) {
      if (order === "asc"){
          return a - b;
      } else if (order === "desc"){
        return b - a;
      }
    })
    // if (order === "asc"){
    //   return lodash.orderBy(this.cosas(this.cosas["price", "asc"]))
    // }
  };
}

export { ListaDeProductos, Product };
