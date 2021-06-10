import * as fs from "fs";
import * as remove from "lodash/remove";
import * as  orderBy from "lodash/orderBy";

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
  super(name);
const archivoProdJson = fs.readFileSync(__dirname + "/products.json").toString();
const prodJson = JSON.parse(archivoProdJson);
prodJson.forEach((p) => {
  this.addProduct(p);
  });
}
addProduct(product: Product){
    this.add(product);
  }
getProduct(id:number): Product{
  const cosas = this.getCosas();
  return cosas.find((cosas) => cosas.id == id);
}
removeProduct(id:number){
  //remove(this.cosas, ((cosas)=> cosas.id == id));
const arrayNuevo = remove(this.cosas, ((c)=> c.id == id));
console.log(id, this.cosas, arrayNuevo);
}
getSortedByPrice(order: "asc" | "desc"){
return orderBy(this.cosas, ["price"], [order]);
}
}





  export { ListaDeProductos, Product }