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
    super(name)
    const productsJson = fs.readFileSync(__dirname + "/products.json").toString()
    const productsJsonParse = JSON.parse(productsJson)
    productsJsonParse.forEach((prod) => {
      this.addProduct(prod)
    });
  }
  addProduct(product:Product){
    return this.add(product)
  }
  getProduct(id:number){
    const productList = this.getCosas()
    return productList.find(p=>
      p.id == id
    )
    
  }
  removeProduct(id:number){
    const productList = this.getCosas()
    const productRemoved = remove(productList, p => p.id == id)
    return productRemoved
  }
  getSortedByPrice(order:"asc"|"desc"){
    const productList = this.getCosas()
    return orderBy(productList,["price"],[order]) 
  }
}

import * as orderBy from "lodash/orderBy"
import * as remove from "lodash/remove"
import * as fs from "fs"
export { ListaDeProductos, Product };
