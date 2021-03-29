import * as products from "./products.json"
import * as _ from "lodash"

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
    
    products.map(producto => {
      this.addProduct(producto)
      
    });
    
  }

  
  addProduct(Product:Product){
  
    const idDeLosProductos = this.cosas.filter(item => {item.id});
    
    if (idDeLosProductos.includes(Product.id)){
      throw "El id del producto que ingresaste ya existe."
    } 
  
    this.add(Product)
  }
  

getProduct(idNumber:number):Product{
 const resultadofiltrado = _.find(this.cosas,['id', idNumber])
 return resultadofiltrado
}


removeProduct(idNumber:number){
const productoABorrar = _.find(this.cosas,['id', idNumber]) 
_.pull(this.cosas,productoABorrar)
}


getSortedByPrice(order:string){

  type order = "asc" | "desc"

 if(order == "asc") {
 return this.cosas = _.orderBy(this.cosas,"name","asc")
 }


if(order == "desc") {
  return this.cosas = _.orderBy(this.cosas,"name","desc")

}}

}


export { ListaDeProductos, Product };