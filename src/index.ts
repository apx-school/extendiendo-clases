import { readFileSync } from 'fs';
import { join } from 'path';
import { orderBy } from 'lodash';

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
    const productsJSON = JSON.parse(readFileSync(join(__dirname + '/products.json'), 'utf-8'));
    productsJSON.forEach(product => this.addProduct(product));
  }

  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product {
    return this.cosas.find(producto => producto.id === id);
  }

  removeProduct(id: number): Product[] {
    return (this.cosas = this.cosas.filter(cosa => cosa.id !== id));
  }

  getSortedByPrice(order: 'asc' | 'desc'): void {
    return orderBy(this.cosas, ['price'], [order]);
  }
}

export { ListaDeProductos, Product };
