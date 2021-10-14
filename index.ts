import * as _ from "lodash";
import { readFileSync } from 'fs';

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

  constructor(name: string){
    super(name);
    const data: Product[] = JSON.parse(readFileSync(`${__dirname}/products.json`).toString());
    data.forEach(producto => this.addProduct(producto));
  }
  
  addProduct(producto: Product){
    const seRepite = this.cosas.find(cosa => {
      return cosa.id === producto.id;
    })
    
    if(!seRepite){
      this.add(producto);
    }
  }

  getProduct(id:number){
    const producto = this.cosas.find(cosa => {
      return cosa.id === id;
    })

    return producto;
  }

  removeProduct(id: number){
    const nuevoArray = this.cosas.filter(cosa => {
        cosa.id !== id;
    })

    this.cosas = nuevoArray;
  }

  getSortedByPrice(order: "asc" | "desc"){
    return _.orderBy(this.cosas, ['price'],[order]);
  }
}

export { ListaDeProductos, Product };