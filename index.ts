import * as products from "./products.json";
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

  constructor(name:string) {
    super(name)
    products.forEach(item => {
      this.addProduct(item);
    });

  }
  addProduct(product: Product) {
    this.add(product)
  }
  getProduct(numberId:number): Product {
    return this.cosas.find((item) => item.id == numberId)
  }
  removeProduct(numberId:number) {
    let bye = remove(this.cosas, (item) => item.id == numberId) 

  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
    
  }

}

export { ListaDeProductos, Product };
