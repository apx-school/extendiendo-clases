import * as fs from "fs"
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
  constructor(name:string){
    super(name)// el readFileSync no me devuelve un string por eso lo convierto
    const contenidoDeJson = fs.readFileSync(__dirname + "/products.json").toString()
    const JsonParseado = JSON.parse(contenidoDeJson) // paso el string a un array
    JsonParseado.forEach(element => { // itero el array y le paso a addProduct cada elemnt del array
      this.addProduct(element)
    });
  }
  
  addProduct(product:Product){
    this.add(product)
  }
  
  getProduct(id:number) : Product {
   const cosas = this.getCosas()
   return cosas.find((c) => (c.id == id))
  }
  removeProduct(id:number){
     const arrayNuevo = remove(this.cosas, (c) => c.id == id)
     console.log(id, this.cosas, arrayNuevo)
    
    }
  getSortedByPrice(order: "asc" | "desc"){
   return orderBy(this.cosas, ["price"], [order])
  }

}


export { ListaDeProductos, Product };
