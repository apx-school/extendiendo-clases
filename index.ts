import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";
import * as fs from "fs";

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
   var productosJson = fs.readFileSync(__dirname + "/products.json").toString();
   var listaProductos = JSON.parse(productosJson);
   listaProductos.forEach(element => {
     this.addProduct(element)
   });

 }
  addProduct(producto: Product){
  this.add(producto)
}
  getProduct(id:number):Product {
    var cosas = this.getCosas()
    return cosas.find(function(item){return item.id === id})
  }
  removeProduct(id:number):Product{
    let productoARemover = this.cosas.find(function(item){return item.id === id})
    return remove(this.cosas, function(n){
      return n === productoARemover
    })
  }
  getSortedByPrice(order:"asc" | "desc"){
    return orderBy(this.cosas, ["price"],[order])
  }

  }

export { ListaDeProductos, Product, ListaDeCosas };

