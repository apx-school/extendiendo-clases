import * as productosJson from "./products.json";
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
  addProduct(producto: Product){if(this.cosas.includes(producto)){
  }else{return this.add(producto)}
}
constructor(name: string){
  super(name)
  productosJson.forEach((p)=>{
    this.addProduct(p);
  })
}

getProduct(id:number): Product{ 
return this.getCosas().find((p)=> p.id == id)} 

removeProduct(id:number):Product {
  return remove(this.cosas, (p)=> p.id == id)
}

getSortedByPrice(order: "asc" | "desc"){
return orderBy(this.cosas, ["price"], [order])
}
}



export { ListaDeProductos, Product };
