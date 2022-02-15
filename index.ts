import * as products from "./products.json";
import * as fs from "fs";
import * as lodash from "lodash";


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
    this.cosas = products.map(i=>i); 
  }

  addProduct(newProduct:Product){
    const noEsta = this.cosas.find( i => i.id == newProduct.id ); 
    if (!noEsta){
       this.add(newProduct);
    }else{
    console.log("el ID ", newProduct.id, " ya existe");
    }
  }
  getProduct(id:number):Product{
    return this.cosas.find(i => i.id == id);
  }
  removeProduct(id:number){
    this.cosas = this.cosas.filter(i => i.id != id );
  }
  getSortedByPrice(order:string){
    const isAscendent = order.toUpperCase() == "ASC";
    const isDescendent = order.toUpperCase() == "DESC";
    
    if(isAscendent){
      this.cosas = lodash.orderBy(this.cosas,'price', 'asc');
    }
    if(isDescendent){
      this.cosas = lodash.orderBy(this.cosas, 'price', 'desc');
    }
    return this.cosas;
  }
}


export { ListaDeProductos, Product };
