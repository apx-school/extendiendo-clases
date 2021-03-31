import * as fs from "fs"
import * as remove from "lodash/remove"
import * as find from "lodash/find"
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

constructor(name:string){
   super(name)

   const productosJson = fs.readFileSync(__dirname + "/products.json").toString()
   const productos = JSON.parse (productosJson)
  
   productos.forEach(element => {
   this.addProduct(element)
  }); 
 }

addProduct(producto: Product){
this.add(producto)
}
  
getProduct(id:number):Product{
  return find(this.cosas,{id:id})
}

removeProduct(id:number){
remove(this.cosas,(element) => element.id == id);
}
 

getSortedByPrice(order: "asc" | "desc"){
  return orderBy(this.cosas, ["price"],[order])
}
  
}
  
export { ListaDeProductos, Product };
