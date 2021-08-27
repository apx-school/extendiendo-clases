import * as fs from 'fs';
import * as _ from 'lodash';

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
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
    
    const archivo = JSON.parse(fs.readFileSync(__dirname + '/products.json').toString());
    archivo.forEach((x) => {
      return this.addProduct(x);
    });
  }
  
  addProduct(product: Product){
    this.add(product);
  }
  getProduct(id: number): Product{
    const cosas = this.getCosas();
    return cosas.find((x) => x.id == id);
  }
  removeProduct(id: number){
    _.remove(this.cosas, (x) => x.id == id);
  }
  getSortedByPrice(order: 'asc' | 'desc'){
    return _.orderBy(this.cosas, ['price'], [order])
  }

}

export {ListaDeProductos, Product};
