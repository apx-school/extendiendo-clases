import * as products from "./products.json";
import * as fs from "fs" 
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
    const readJSON = fs.readFileSync(__dirname + "/products.json").toString();
    const parseJSON = JSON.parse(readJSON);
    parseJSON.forEach((i) => {
      this.addProduct(i)
    });
     
  }
  
  addProduct(instance:Product){
    if(this.cosas.includes(i => i.id = instance.id)){}
    else this.add(instance);
  }

  getProduct(id:number):Product{
    var aux = this.getCosas();
    var aux2 = aux.find(i => i.id === id);
    return aux2
  }

  removeProduct(id:number){
    var aux = this.cosas.indexOf(i => i.id = id)
    this.cosas.splice(aux, 1); 
  }

  getSortedByPrice(order:string){
    type order = "asc" | "desc";
    if(order === "asc"){return this.cosas.sort(
      (a, b) => (a.price < b.price ? -1 : 1))}
    else{return this.cosas.sort(
      (a, b) => (a.price > b.price ? -1 : 1))}  
  }
} 

export { ListaDeProductos, Product };