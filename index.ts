import { timeStamp } from "console";
import * as fs from 'fs';
import * as _find from "lodash/find";
import * as _remove from "lodash/remove"
import * as _sortBy from "lodash/sortBy";
import * as _reverse from "lodash/reverse";
import * as _map from "lodash/map";

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
  name: string;
  constructor(name:string )  {
    super(name);
    const datos = JSON.parse(fs.readFileSync("./products.json", 'utf8'));
    datos.forEach(element => {
      this.addProduct(element);
    });
  }
  
  addProduct(product: Product){
    var exists:boolean;
    this.cosas.find((item) => (item.id == product.id) ? exists = true : null);
    if(exists != true)
      this.add(product)
  }

  getProduct(id:number): Product{
    return this.cosas.find((item) => item.id == id)
    //return _find(this.cosas, (itemDeProducto) => itemDeProducto.id == id );
  }

  removeProduct(id:number): Product{
    return _remove(this.cosas, (itemDeProducto) => itemDeProducto.id == id);
  }

  getSortedByPrice(order:string){
    type order = "asc" | "desc";
    if(order == "asc")
      return _sortBy(this.cosas, (item) => item.price)
    else if (order == "desc")
      return _reverse(this. cosas, (descItem) => descItem._sortBy(this.cosas , (ascItem) => ascItem.price));
  }

}

export { ListaDeProductos, Product };
