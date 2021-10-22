import * as fs from 'fs';
import * as remove from 'lodash/remove';
import * as orderBy from 'lodash/orderby';

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
    var archivo = fs.readFileSync('products.json').toString();
    var archivoParseado: Product[] = JSON.parse(archivo);

    archivoParseado.forEach((e) => {
      return this.addProduct(e);
    });
  }

  addProduct(producto: Product) {
    return this.add(producto);
  }

  getProduct(id: number): Product {
    return this.cosas.find((e) => e.id == id);
  }

  removeProduct(id: number) {
    remove(this.cosas, (n) => n.id == id);
  }

  getSortedByPrice(order: 'asc' | 'desc') {
    return orderBy(this.cosas, 'price', order);
  }
}

const lista = new ListaDeProductos('santi');

export { ListaDeProductos, Product };
