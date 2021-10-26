import * as fs from "fs";
import * as remove from "lodash/remove";
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
   
  constructor(name: string){
    super(name)
    const contenidoDelArchivo = fs.readFileSync(__dirname + "/products.json").toString()
    const productos = JSON.parse(contenidoDelArchivo);
    productos.forEach(prod => {
      this.addProduct(prod)      
    });
  }
  addProduct(producto: Product){
    this.add(producto);
  }
  getProduct(id:number): Product{
    return this.getCosas().find(i => i.id == id)
  }
  removeProduct(id:number):Product{
    return remove(this.cosas, c => c.id == id)
  }
  getSortedByPrice(order: "asc"|"desc"):Product[]{
    return orderBy(this.cosas, ["price"], ["desc"])
  }
}


function main(){
  
const producto = new Product("iphone", 100, 1234)
const lista = new ListaDeProductos("cosas")
const listaConProducto = lista.addProduct(producto)
console.log(listaConProducto);


}
main()
export { ListaDeProductos, Product };
