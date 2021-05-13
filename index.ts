import * as products from "./products.json";
import * as _ from "lodash";
import * as fs from "fs";
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

  constructor(name:string){
    super(name); //Me traigo las propiedades de la clase padre.
    products.forEach(t=> { //"products" es del import.
      this.add(t); //Cargo el JSON en el array original.
    })
  }

  addProduct(product:Product){
    this.add(product);
  }//Fin del addProduct. (Funciona).
  
  getProduct(id:number):Product{
    const array = this.getCosas();
    const resultado = array.find((t) => t.id == id);
    return resultado;
  }//Fin del getProduct. (Funciona).

  removeProduct(id:number){
    _.remove(this.cosas, (t) => t.id == id);//Metoodo con Lodash.
  }//Fin del remove. (Funciona).

  getSortedByPrice(order: "asc" | "desc"){ //
    return _.orderBy(this.cosas, ["price"], [order]);
  }//Fin del sort. (Funciona).

}

export { ListaDeProductos, Product };
