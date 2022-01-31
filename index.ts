import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/OrderBy";

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
   const productosAnterioresEnArchivo = fs.readFileSync(__dirname + "/products.json").toString();
   const productosParseados = JSON.parse(productosAnterioresEnArchivo);
   productosParseados.forEach((item) => {
     this.addProduct(item);
   });
  }    
  products: Product;
  addProduct(product: Product) {
    this.add(product);
  }
  getProduct(id:number) {
    const cosas = this.getCosas();
    return cosas.find((item) => (item.id == id));
  }
  removeProduct(id: number){
    const arrayNuevo = remove(this.cosas, (item) => item.id == id); 
    return arrayNuevo
  }
  getSortedByPrice(order:string){
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
