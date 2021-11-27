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
  constructor(name:string) {
    super(name)
    const archivoOriginal = fs.readFileSync(__dirname + "/products.json")
    const productos = archivoOriginal.toString()
    const objetoProductos = JSON.parse (productos);
    objetoProductos.forEach(item => {
      this.addProduct(item)
    });

  }
  addProduct(producto:Product) {
    const idRepetido = this.cosas.find(function (item){
      item.id == producto.id
    });
    if (idRepetido) {
      
    } else {
      this.add(producto)
    }
  }
  getProduct(id:number):Product {
    const productoBuscado = this.cosas.find(function(item) {
      return item.id == id;
    });
    return productoBuscado;
  }
  removeProduct(id:number):Product {
    const productoARemover = remove(this.cosas, function(item){
      return item.id == id;
    });
    return productoARemover;
  }
  getSortedByPrice(order: "asc" | "desc") { 
  return orderBy(this.cosas, ["price"], [order])
  }
}

export { ListaDeProductos, Product };
