import * as productList from "./products.json"
import * as sortBy from "lodash/sortBy"
import * as reverse from "lodash/reverse"
import * as remove from "lodash/remove"

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
    productList.forEach(i=>this.addProduct(i))
  }
  getProduct(id:number):Product{
    return this.cosas.find(i=>i.id==id)
  }
  addProduct(product:Product){
    var idRepetido = false
    this.cosas.forEach(i=>{if(i.id==product.id){idRepetido=true}})
    if (idRepetido){
          console.warn("Error:El id ingrsado ya existe. Por favor intente ingresando otro id.")
    }else{this.add(product)}
  }
    removeProduct(id:number):Product{
      return remove(this.cosas,this.getProduct(id))
    }
  getSortedByPrice(order:"asc"|"desc"){
    var rtta=[]
    if(order=="asc"){
      rtta= sortBy(productList,[i=>i.id])
    }else{
      rtta= reverse(sortBy(productList,[i=>i.id]))
    }
    return rtta

  }
  
}

export { ListaDeProductos, Product };
