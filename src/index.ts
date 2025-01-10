
import * as fs from "fs"
import { orderBy } from "lodash";
import remove from "lodash/remove";
import pullAllBy from "lodash/remove"

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
 productosIniciales:Product[] = [];
  constructor(name: string) {
    super(name);
    const archivoJson = fs.readFileSync(__dirname + "/products.json").toString();
    const productosDelarchivo = JSON.parse(archivoJson);
    productosDelarchivo.forEach((p) => { 
      this.addProduct(p)
      
    });
  }
  addProduct(product: Product): void {
    this.add(product)

  }
  getProduct(id: number) : Product {
    const productos = this.getCosas();
    return productos.find((producto) => producto.id == id)  }
    
  removeProduct(id: number) {
    return remove(this.cosas, (c) => c.id == id  )
  }
  getSortedByPrice(order: 'asc' | 'desc') {
    return orderBy(this.cosas, ["price"], [order])
    
  };
}


export { ListaDeProductos, Product };
