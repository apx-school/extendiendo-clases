import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

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
  addProduct(newProduct: Product){
    const valido = this.cosas.find(function(item){return item.id == newProduct.id})
    if(valido == undefined){
      return this.add(newProduct)
    }
  }
  constructor(name:string){
    super(name)
    const contenidoDelArchivo = fs.readFileSync(__dirname + "/products.json").toString()
    const productosDelArchivo = JSON.parse(contenidoDelArchivo)
    productosDelArchivo.forEach(element => {
      this.addProduct(element)
    });
  }

  getProduct(id:number):Product{
    return this.getCosas().find(function(item){return item.id == id})
  }

  removeProduct(id:number):Product{
    return remove(this.getCosas(),function(item){return item.id == id})
  }

  getSortedByPrice(order:"asc"|"desc"){
    return orderBy(this.getCosas(),['price'],[order]) 
  }
  
}


export { ListaDeProductos, Product };
