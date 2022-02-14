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
    super(name);
    
    const contenidoDelArchivo = fs.readFileSync(__dirname + "/products.json").toString()
    
    const productosDelArchivo = JSON.parse(contenidoDelArchivo)
    productosDelArchivo.forEach(p => {
      this.addProduct(p)
    });
  }
  
  addProduct(product:Product){
    this.add(product)
  }
  
  getProduct(id:number):Product{
    return this.getCosas().find(x=>x.id == id)
  }

  removeProduct(id:number):Product{
    const arraySinProducto = remove(this.cosas, (c) => c.id == id)
    return arraySinProducto
  }
    
  getSortedByPrice(order:"asc"|"desc"){
    const rta = orderBy(this.cosas, ["price"], order)
    console.log(rta);
    return rta
    
  }
    
    
}

export { ListaDeProductos, Product };
