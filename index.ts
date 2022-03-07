import * as remove from "lodash/remove";
import * as fs  from "fs";
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
    const archivo = fs.readFileSync(__dirname + "/products.json");
    const archivoAString = archivo.toString();
    const archivoAObjeto = JSON.parse(archivoAString);
   

    archivoAObjeto.forEach( (p)=>{
      this.addProduct(p);
    });
   
    
  };
  addProduct(Producto:Product){
    
      this.add(Producto);
    
  }

  getProduct(id:number):Product{
    return this.getCosas().find(function (item){ 
      return item.id == id; 
    })
  }

  removeProduct(id:number):Product{
    return remove(this.cosas,function(item ){
      return item.id == id;
    });
  }

  
  getSortedByPrice(order:"asc" | "desc"){
    if(order=="asc"){
      return orderBy(this.cosas, ["price"],[order]);
    }
    else if(order=="desc"){
      return orderBy(this.cosas, ["price"],[order]);
    }
  }

}

export { ListaDeProductos, Product };
