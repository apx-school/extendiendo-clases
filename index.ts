import * as _ from "lodash"
import * as productsJSON from './products.json';


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
  
  constructor(name) {

    super(name);
    this.cosas = productsJSON

  
  }

  addProduct(productoACargar:Product){
    const cosasEncontradas = this.cosas.find(x => x.id !== productoACargar) // Chequeo que no este
    return this.add(productoACargar) // lo cargo
  }

  getProduct(id:number):Product{
    return this.cosas.find(x => x.id === id)
  }

  removeProduct(id:number){
    _.remove(this.cosas, x => x.id === id)
  }

  getSortedByPrice(order:string){
    if (order === "asc") {
      return _.orderBy(this.cosas,"price","asc")  
    } else {
      return _.orderBy(this.cosas,"price","desc")
    }
  }


}

export { ListaDeProductos, Product };
