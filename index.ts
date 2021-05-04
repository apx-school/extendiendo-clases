import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";
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
    const contenidoDeJson = fs.readFileSync(__dirname + "/products.json").toString();
    const productosDeJson = JSON.parse(contenidoDeJson);
    productosDeJson.forEach(p => {
      this.addProduct(p);
    });
  }
  addProduct(product: Product){
    this.add(product);
  }
  getProduct(id:number):Product {
    const productos = this.getCosas();
    return productos.find((p) =>(p.id == id));
  }
  removeProduct(id:number):Product {
    const productoRemovido = remove(this.cosas, (p) => p.id ==id);
    return productoRemovido; 
  }
  getSortedByPrice(order:string){
    const productosOrdenados = orderBy(this.cosas, ["price"], [order]);
    return productosOrdenados;
  }
  
}

export { ListaDeProductos, Product };
