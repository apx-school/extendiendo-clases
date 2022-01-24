import * as fs from "fs"
import * as remove from "lodash/remove"
import * as orderBy from "lodash/orderBy"

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
    const productosString = fs.readFileSync(__dirname + "/products.json").toString()
    const coleccionParseada = JSON.parse(productosString)

    coleccionParseada.forEach((X) => {
      this.addProduct(X)
    });
    
  }
  getSortedByPrice(order:"asc" | "desc"){
    const arrayOrdenado = orderBy(this.cosas,"price",order)
    return arrayOrdenado
  }
  removeProduct(id:number):Product{
    const productoRemovido = remove(this.cosas, (X) =>{
      return X.id == id
    })
    return productoRemovido
  }

  getProduct(id:number):Product {
   //const productoIdEncontrado = this.cosas.find((x:Product) =>{
     // return x.id == id
   //})
   //return productoIdEncontrado

   const cosas = this.getCosas()
   
   const encontrado = cosas.find((x) => {
     return x.id == id
   })
     
   
   return encontrado
  }
  
  addProduct(producto : Product){
    
var encontado:boolean = false
this.cosas.forEach((x:Product)=>{
  if(x.id == producto.id){
encontado = true
  }
})
if (encontado == false){
      
      this.add(producto)}else { console.log("el producto ya esta agregado a la lista.")}
 
    } 
}

function main() {
  

 
}

main()
export { ListaDeProductos, Product };
