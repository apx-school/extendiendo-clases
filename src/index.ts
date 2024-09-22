
import * as fs from "fs"
import   {orderBy}  from "lodash";
import  remove from "lodash/remove";


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
  const constenidoJSON = fs.readFileSync(__dirname +"/products.json").toString()
  const productosJSONParseado = JSON.parse(constenidoJSON);

  productosJSONParseado.forEach((p) => {
    this.addProduct(p)
  });

  }
  addProduct(product: Product): void {
    // Implementación del método addProduct
    // ...
    this.add(product);
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    // ...
    const idEncontrado = this.cosas.find(x=>(x.id === id));
    return idEncontrado
  }

  removeProduct(id: number): Product | any{
    // Implementación del método removeProduct
    // ...
     const arrayNuevo= remove(this.cosas, (c)=> c.id == id)
   
  }

  getSortedByPrice(order: "desc"|"asc") {
    // Implementación del método getSortedByPrice
    // ...
   
    return  orderBy(this.cosas, ["price"], [order])
    
  }
}

function main (){
  // console.log(productosJSON);
}
main ();
export { ListaDeProductos, Product };
