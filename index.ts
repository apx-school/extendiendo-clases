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
  constructor(name: string){
    super(name)
    const contenidoJSON = fs.readFileSync(__dirname + "/products.json").toString()
    const productosJSON = JSON.parse(contenidoJSON)
    productosJSON.forEach((p)=>{
      this.addProduct(p)
    })

  }
  addProduct(producto: Product){
    this.add(producto)
  }
  //tener un método getProduct(id:number):Product que devuelva el producto con ese id.
  getProduct(id:number): Product{
    const cosas = this.getCosas()
    return cosas.find((c)=>(c.id == id))
  }
  //tener un método removeProduct(id:number):Product que elimine el producto con ese id.
  removeProduct(id:number):Product{
    return remove(this.cosas, (c)=> (c.id = id))
  }
  //tener un método getSortedByPrice que reciba un parámetro order:string con solo dos valores posibles: asc o desc
  getSortedByPrice(order: "asc" | "desc"){
    return orderBy(this.cosas,["price"],["desc"])
    
  }
}

export { ListaDeProductos, Product };
