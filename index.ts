import * as fs from "fs";
import {remove , orderBy} from "lodash";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {

    this.name = name;
  }  
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }  
  getCosas() {
    return this.cosas;
  }  
};  

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
    let productJsonSinParse = fs.readFileSync(__dirname + "/products.json")
    .toString()
    let productJson = JSON.parse(productJsonSinParse)
    productJson.forEach(element => {
      this.addProduct(element)
      
    });  

  };  
  
  addProduct(product){
  this.add(product);
}  
  getProduct(id:number):Product{
    const cosas = this.cosas;
    return cosas.find((c)=> c.id == id)
}  
  removeProduct(id:number){
    return remove(this.cosas, (c) => c.id == id);
}
  getSortedByPrice(order : "asc" | "desc"){
   return orderBy(this.cosas, ["price"], [order])
  }

}  


export { ListaDeProductos, Product };

 
