
import * as fs from "fs"
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
  constructor(name:string){
    super(name)
    
    const archivo = fs.readFileSync(__dirname + "/products.json").toString()
    const productJeson = JSON.parse(archivo)
    productJeson.forEach((p) => {
      this.addProduct(p)
    });
  }
    
  addProduct(instancia: Product){
    this.add(instancia)
  }
  getProduct(id:number):Product{
    const cosas = this.getCosas()
    return cosas.find((i)=> i.id == id)
    }
  
  removeProduct(id:number){
    remove(this.cosas, (i)=>i.id == id)
  }
  getSortedByPrice(order:"asc" | "desc"){
   return orderBy(this.cosas, ["price"], [order])

  }
}
function main(){
const x = new ListaDeProductos("hola")
}
main()
export { ListaDeProductos, Product };
