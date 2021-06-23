import * as fs from "fs"
import * as remove from "Lodash/remove"
import * as orderBy from "Lodash/orderBy"

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
    const archivoString = archivo.toString();
    const archivoParseado = JSON.parse(archivoString);
    archivoParseado.forEach((p) =>{
      this.addProduct(p);
    })
  }
  addProduct(unProduct: Product){
    this.add(unProduct);
  }
  getProduct(id:number):Product{
    const cosas = this.getCosas();
    return cosas.find((cosa) => (cosa.id == id));
  }
  removeProduct(id:number){
    remove(this.cosas, (cosa) => (cosa.id == id));
  }
  getSortedByPrice(order: "asc" | "desc"){
    return orderBy(this.cosas, ["price"], [order]);
  }

}

export { ListaDeProductos, Product };
