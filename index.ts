import * as remove from './node_modules/lodash/remove'
import * as ordenar from './node_modules/lodash/orderBy'
const fs = require('fs');

function abrirArchivoJSON(nombreArchivo:string) {
    const archivo = fs.readFileSync(__dirname + "/" + nombreArchivo);
    const archivoEnTexto = archivo.toString();
    return JSON.parse(archivoEnTexto);
}

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
  addProduct(product:Product){
    const Ids = this.cosas.map( p => p.id)
    if (!Ids.includes(product.id)){
      this.add(product);
    }
  }
  constructor(name: string){
    super(name)
    const elementosDelJSON = abrirArchivoJSON('products.json')   
    elementosDelJSON.forEach((p) => this.add(p))
  }

  getProduct(id:number){
    const productoEncontrado = this.cosas.find(p => p.id == id)
    return productoEncontrado
  }
  
  removeProduct(id:number){
    const productoParaEliminar = this.cosas.filter(p => p.id == id)
    this.cosas = remove(this.cosas,(cosa) =>{
      return cosa == productoParaEliminar
    })
  }
  getSortedByPrice(order:string){
    /* type eventType = "asc" | "desc";
    function on(event:string,callback :()=>any){
      console.log('entre a la funcion',event)
      
    }
    on(order,()=>console.log(order)); */
    if(order == 'asc' || order == 'desc'){
      return ordenar(this.cosas,"price",order)
    }
  }
}

export { ListaDeProductos, Product };
