import * as fs from 'fs';
import * as remove from 'lodash/remove';
import * as orderBy from 'lodash/orderBy';

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
  constructor(name: string) {
    super(name);
    const productosJSON = fs
      .readFileSync(__dirname + '/products.json')
      .toString();
    const productosArray = JSON.parse(productosJSON);
    productosArray.forEach((e) => {
      this.addProduct(e);
    });
  }
  addProduct(producto: Product) {
    this.add(producto);
  }
  getProduct(id: number): Product {
    const arrayCosas = this.getCosas();
    return arrayCosas.find((e) => e.id == id);
  }

  removeProduct(id: number): Product {
    return remove(this.cosas, (e) => e.id == id);
  }

  getSortedByPrice(order: 'asc' | 'desc'): Product {
    return orderBy(this.cosas, 'price', order);
  }
}

export { ListaDeProductos, Product };
