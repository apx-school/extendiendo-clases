import { readFileSync } from "fs";
import {orderBy} from "lodash";

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
    super(name);
    this.pullProducts()
  }

   pullProducts() {
      const productos = JSON.parse(readFileSync('products.json',{encoding: 'utf-8'}));
      productos.forEach(e=>this.addProduct(e));
  }

  addProduct(producto: Product){
    if (this.cosas.length > 0){
      this.cosas.forEach((e)=>{if ((e.id===producto.id)) throw `Ya se encuentra en la lista de productos un producto con id: ${producto.id}`});
    };
    this.add(producto);
  }  

  getProduct(id:number){
    return this.cosas.find((e)=>e.id === id);
  }

  removeProduct(id:number){
    const removeIndex = this.cosas.findIndex(e=>e.id === id);
    this.cosas.splice(removeIndex, 1);
  }

  getSortedByPrice(order: "asc"|"desc"){
    return orderBy(this.cosas,"price",order);
  }
}

export { ListaDeProductos, Product };
