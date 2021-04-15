import * as fs from "fs";
import * as remove from "lodash/remove";
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
    const jsonFileContentReader = fs.readFileSync(__dirname + "/products.json").toString();
    const parsedContent = JSON.parse(jsonFileContentReader);
    parsedContent.forEach((p)=>{
      this.addProduct(p);
    })
  };
  addProduct(product:Product){
    this.add(product);
  };
  getProduct(id:number){
    const productFinder = this.cosas.find((p) => p.id == id);
    return productFinder;
  };
  removeProduct(id:number){
    const productRemover = remove (this.cosas,(p) => p.id == id);
    return productRemover;
  };
  getSortedByPrice(order : "asc" | "desc"){
    const orderedProducts = orderBy(this.cosas,["price"],[order]);
    return orderedProducts;
  };
}

export { ListaDeProductos, Product };
