import * as products from "./products.json";
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
    super(name)

  }
  getSortedByPrice(order:string){
    if(order ==="desc"){
      return orderBy(this.cosas)
    }
    if(order ==="asc"){
      let descen=orderBy(this.cosas);
      return descen.reverse()
    }
  }
  removeProduct(id:number):Product{

    return this.cosas.find((item,index)=>{
      if(item.id === id){
        return this.cosas.splice(index,1)
      }
    })
    
  }

  addProduct(product:Product){
    let agregarValor = this.cosas.includes(product.id)
    if(!agregarValor){
      return this.add(product)
    }
  }

  getProduct(id:number):Product{
    let encontrado= this.cosas.find(item=>{
      if(item.id === id){
        return true;
      }
    })
    return encontrado
  }
  getCosas(){
    return products
  }
}

export { ListaDeProductos, Product };
