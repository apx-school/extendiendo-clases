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

  addProducts(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }


  findProductsBelow(precioBase:number){
    
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
    const contenidoDelJson = fs
    .readFileSync(__dirname + "/products.json")
    .toString();

    const productosDelarchivo = JSON.parse(contenidoDelJson)

     productosDelarchivo.forEach(element => {
      this.addProduct(element)
    }); 
  }

  getProduct(id:number): Product{
    const cosas = this.getCosas()
     return cosas.find((cosa)=> cosa.id == id)
  }

  removeProduct(id:number){
   remove(this.cosas, (c) => c.id == id)
  }

  getSortedByPrice(order:"asc" | "desc"){
    return orderBy(this.cosas,["price"],[order])
    
  }

  addProduct(nuevaCosa: Product){
      this.addProducts(nuevaCosa)
  }
}

export { ListaDeProductos, Product };





/*function main (){
  const contenidoDelArchivo = fs.readFileSync(__dirname + "/products.json").toString()
  const productosJson = JSON.parse(contenidoDelArchivo) 
  const lista = new ListaDeProductos("Kevin");
  const cosas = lista.getCosas();


  console.log(lista.cosas)
}

main();*/
