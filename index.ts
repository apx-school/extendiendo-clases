
import *  as fs from "fs"
import {orderBy, remove}  from "lodash";




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
    const prod = fs.readFileSync(__dirname + "/products.json").toString()

    const prodParseados = JSON.parse(prod)

    prodParseados.forEach(element => {
      this.add(element)
    });
    
  
  
  }
  
  
    addProduct(products:Product){
      this.add(products)
    }

    getProduct(id:number){
      const resp =  this.getCosas()
       return resp.find( (e)=> e.id == id )
       
    }


    removeProduct(id:number){
      const resp = remove(this.cosas, (c) => c.id == id )
       
     
      
    }

    getSortedByPrice( order:"asc"|"desc"){
     return  orderBy(this.cosas,["price"],[order])
    }
}

export { ListaDeProductos, Product };
