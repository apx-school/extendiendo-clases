import * as fs from "fs"
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
  constructor(name:string,){
    super(name)
    const json = fs.readFileSync(__dirname + "/products.json").toString()
    const productos = JSON.parse(json)
    productos.forEach(element => {
      this.addProduct(element)
    });
  }
  addProduct(producto: Product){
   this.add(producto)
  }

  getProduct(id:number):Product{
    let product = this.cosas.filter(ele=>ele.id === id)
    return product[0]
  }
  removeProduct(id:number){
    this.cosas = this.cosas.filter(ele=>ele.id !== id)
    return this.cosas

  }
  getSortedByPrice(order : "asc" | "desc"){
    let t = orderBy(this.cosas,["price"],[order])
    this.cosas = t
    return this.cosas
  }
}

export { ListaDeProductos, Product };
