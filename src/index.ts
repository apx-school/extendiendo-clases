import * as fs from "fs";
import { remove } from 'lodash';
import {orderBy} from 'lodash';

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa: any) {
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
    // Llamada al constructor de la superclase: LisaDeCosas
    super(name);
    const contenidoDelArchivo = fs.readFileSync(__dirname + "/products.json").toString();
    const productosParseados = JSON.parse(contenidoDelArchivo);
    productosParseados.forEach(element => {
      this.addProduct(element);
    });
  }

  addProduct(product: Product): void {
    this.add(product);
  }
    

  getProduct(id: number): Product{
    const cosas = this.getCosas()
    return cosas.find((cosa)=>(cosa.id == id));
  }

  removeProduct(id: number){
    remove(this.cosas, (c)=> c.id==id)
  }

  getSortedByPrice(order: "asc"|"desc"){
    return orderBy(this.cosas, ["price"], [order]);
  }
}


export { ListaDeProductos, Product };
