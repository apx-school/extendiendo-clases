import * as fs from "fs"
import * as remove from "lodash/remove"
import * as orderBy from "lodash/orderBy"
//console.log("productos", products)

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
    super(name);
    const contenidoDelArchivo = fs.readFileSync(__dirname + "/products.json").toString()
    const productosJSON = JSON.parse(contenidoDelArchivo)
    productosJSON.forEach(p => {
      this.addProduct(p);
    });
  }
  addProduct(producto:Product){
    if(!this.getProduct(producto.id)){
      this.add(producto)
    }
  }
  getProduct(id:number):Product{
    const productFound = this.cosas.find(p => p.id == id);
    return productFound;
  }
  removeProduct(id:number):Product{
    const removedProduct = remove(this.cosas,  p => p.id == id);
    return removedProduct;
  }
  getSortedByPrice(order:"asc" | "desc"):Product[]{
    // console.log('antes', this.cosas)
    return orderBy(this.cosas, "price", order)
    // console.log('despues', this.cosas)
  }
}

export { ListaDeProductos, Product };
