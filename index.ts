import * as products from "./products.json";
import * as orderBy from "lodash/orderBy";
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
    const json = fs.readFileSync(__dirname+"/products.json").toString();
    const products = JSON.parse(json);

    products.forEach(element => {
        this.addProduct(element)
    });
  }
  getSortedByPrice(order:"asc"|"desc"){
    return orderBy(this.cosas,["price"],order)
  }
  removeProduct(id:number):Product{

    return this.cosas.find((item,index)=>{
      if(item.id === id){
        return this.cosas.splice(index,1)
      }
    })
    
  }

  addProduct(product:Product){
    this.add(product)
  }

  getProduct(id:number):Product{
    let encontrado= this.cosas.find(item=>{
      if(item.id === id){
        return true;
      }
    })
    return encontrado
  }
  
}

export { ListaDeProductos, Product };
