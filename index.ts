import * as fs from "fs"
import * as remove from "lodash/remove"
import * as orderBy from "lodash/orderBy"

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    
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
  constructor(name : string ){
    super(name)
    const string = fs.readFileSync(__dirname + "/products.json").toString()
    const coleccionProductos : Product [] = JSON.parse(string)
    coleccionProductos.forEach((cadaProducto: Product) => {
      this.addProduct(cadaProducto)
    })
  }

  addProduct (product : Product){
   var encontreProductoConMismoID: boolean = false
   this.cosas.forEach((cadaCosa: Product) => {
     if (cadaCosa.id == product.id) {encontreProductoConMismoID = true}
   })

   if (encontreProductoConMismoID == false) {
    this.add(product)
   }
  }

  getProduct(id:number) : Product{
   const cosas = this.getCosas()
   const productoEncontrado = cosas.find((cosa:Product) => {
     if (cosa.id == id) {return true}
   })
   return productoEncontrado
  }

  removeProduct(id:number): Product[]{
   const productoRemover : Product = this.getProduct(id)
   const arrayRemovido = remove(this.cosas , productoRemover)
   return arrayRemovido
   
  }
  getSortedByPrice(order: "asc" | "desc") {
  return orderBy(this.cosas, ["price"], [order])
  }
}

export { ListaDeProductos, Product };
