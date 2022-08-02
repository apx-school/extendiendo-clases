import * as fs from 'fs';
import * as _ from 'lodash';

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
    const data = fs.readFileSync(__dirname + "/products.json").toString();
    // Esto es un array
    const dataJSON = JSON.parse(data);
    dataJSON.forEach((object) => {
      this.addProduct(object);
    })
  }
  addProduct(product: Product) {
    const chequearId = this.cosas.find((cosa) => {
      return cosa.id === product.id;
    })
    if (chequearId == undefined){
      this.add(product);
    }
    else {
      return "A product with the same ID already exists"
    }
  }
  getProduct(id: number):Product{
    const productConId = this.cosas.find((product) => {
        return product.id === id;
      })
    return productConId;
  }
  removeProduct(id: number):Product{
    const indexOfObject = this.cosas.findIndex((cosa) => {
      return cosa.id === id;
    });
    if (indexOfObject !== -1) {
      this.cosas.splice(indexOfObject, 1)
    }
    return;
  }
  getSortedByPrice(order: "asc" | "desc"){
    return _.orderBy(this.cosas, 'price', order);
  }
};


export { ListaDeProductos, Product };
