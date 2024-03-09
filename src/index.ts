import * as fs from "fs";
import * as  remove from 'lodash';

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
    super(name)
    const contenidoArchivo = fs.readFileSync(__dirname + "/products.json").toString();
    const productosDelArchivo = JSON.parse(contenidoArchivo);
    
    productosDelArchivo.forEach(p => {
      this.addProduct(p)
    });
  }

  addProduct(product: Product): void{
    this.add(product)
  }

  getProduct(id: number):Product {
    const cosas = this.getCosas();
    return cosas.find((c) => (c.id == id))
  }

  removeProduct(id: number):Product {
    const arrayNuevo = remove(this.cosas, (c) => c.id == id);
    return arrayNuevo;
  }

  getSortedByPrice(order: "asc" | "desc"): void {
    
    if(order == "asc"){}
  }

}

export { ListaDeProductos, Product };
