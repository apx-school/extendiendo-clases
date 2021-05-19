import * as fs from "fs"
import * as pullAllBy from "lodash/pullAllBy"
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
  constructor (name:string ){
    super(name);
    const contenidoDeArchivo = fs.readFileSync(__dirname + "/products.json").toString()
    const productosDelArchivo = JSON.parse(contenidoDeArchivo)
    productosDelArchivo.forEach( (p) => {
      this.addProduct(p)
    })
  }
  addProduct(product: Product){
    this.add(product)
  }
  getProduct(id:number): Product {
    const cosas = this.getCosas()
   return cosas.find((p) =>  p.id == id)
  }
  removeProduct(id:number){
    const arrayNuevo = remove(this.cosas, (c) => c.id == id)
  }

  getSortedByPrice (order:"asc"|"desc"){
    return orderBy (this.cosas, ["price"], [order])
  
  }

}



export { ListaDeProductos, Product };
