import * as products from "./products.json"
import * as orderBy from "lodash/orderBy";
import * as remove from "lodash/remove"

type EvenType="asc" | "desc";

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
    products.map((el:Product)=>{
      this.addProduct(el)
      }
    )
  }

  addProduct(Product:Product){
    const pruebaLogica=this.cosas.find(el=>{ return el.id===Product.id})===undefined
    if (pruebaLogica==true){
      this.add(Product)
    }
    else{
    console.log("el ",Product,"ya existe")
    }
  }
  
  getProduct(id:number){
    return this.cosas.find(el=>{
      return el.id===id
    }
    )
  }
  
  removeProduct(numero:number){
    return this.cosas.forEach((element,i) => {
      if (this.cosas[i].id===numero){
        this.cosas.splice(i,1)
        }
      }
    );
  }
  
  getSortedByPrice(order:EvenType){
    if(order=="asc"){
      this.cosas.sort((a:Product,b:Product)=>{
        return a.price-b.price
      })
    }
    else{
      this.cosas.sort((a:any,b:any)=>{
        return b.price-a.price
      })
    }
  return this.cosas
  }
}

export { ListaDeProductos, Product };

