import productitos from "./products.json";
import fs from "fs"
const _ = require("lodash");

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

// ? const prueba = new ListaDeCosas("mierdas")
// console.log(prueba.name, prueba.cosas, prueba.getCosas())
// prueba.add(912)
// console.log(prueba.cosas, prueba.getCosas())


class ListaDeProductos extends ListaDeCosas {
  // tipoDeProducto: Product;
  
constructor(name: string) {
  super(name);

  const contenido =  fs.readFileSync(__dirname + "/products.json").toString()
  const productosJSON = JSON.parse(contenido)
  productosJSON.forEach((p) => {
    this.addProduct(p)
  });

}

addProduct(product: Product): void {
  this.add(product)
}

addListaEntera(lista: Product[]): void{
 lista.forEach((p) => {
   this.addProduct(p)
 })
} 

getProduct(id: number): Product {
  const list = this.getCosas()
  return list.find(p => p.id == id)
}

removeProduct(id: number) {
 _.remove(this.cosas, (c) => c.id ==id);
}

getSortedByPrice(order: string): void {
  if (order === "asc" ||order === "desc") {
   return _.orderBy(this.cosas, ["price"], [order])
  } else {
    console.log("No es un argumento valido")
  }
 }
}
  

// let Yogurt = {
//   name: "yogurt",
//   price: 1200,
//   id: 16
// }

// let lacteos = new ListaDeProductos("lacteos");
// lacteos.addProduct(Yogurt)
// // ? lacteos.addListaEntera(productitos)
// // console.log(lacteos.name, lacteos.cosas)
// console.log(lacteos.getProduct(2))


  export { ListaDeProductos, Product };
  