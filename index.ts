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
    this.cosas.find(function(p){
      if (p.id === producto.id){
        throw "repeated ID"; 
      };
    });
    this.add(producto);
  };
  constructor(name: string){
    super(name);
    const texto = fs.readFileSync(__dirname + "/products.json").toString();
    const textoParseado = JSON.parse(texto);
    textoParseado.forEach((p)=>{
      this.addProduct(p);
    });
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
    return lodash.remove(this.cosas, productoEncontrado2);   // also "pull"
  };
  getSortedByPrice(order: "asc" | "desc"){
    return lodash.orderBy(this.cosas, ["price"],[order])
  };
}

export { ListaDeProductos, Product };
