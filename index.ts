import * as products from "./products.json"
import * as remove from "lodash/remove"
import * as orderBy from "lodash/orderBy"

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
    super(name)
    products.forEach(p => this.add(p))
  } 
  addProduct(nuevoProducto:Product){
    if (this.cosas.find(c => c.id == nuevoProducto.id)){
      return;
    }
    else{
      return this.add(nuevoProducto);
    }
  }

  getProduct(id:number):Product{
    return this.cosas.find(c => c.id == id)
  }
  removeProduct(id:number):Product{
      return remove(this.cosas, function(c){
        return c.id == id
      })
  }
  getSortedByPrice(order:"asc" | "desc"){
    return orderBy(this.cosas, ["price"], order)
  }
}

export { ListaDeProductos, Product };

