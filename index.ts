import * as fs from 'node:fs';
import * as find from 'lodash/find';
import * as orderBy from 'lodash/orderBy';
import * as remove from 'lodash/remove';

type sortType = "asc" | "desc";

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
    // Invoco al constructor original pero lo extiendo al pasarle el products.json y llamar a addProduct para que cargue en cosas cada producto.
    super(name);
    const listaProductos = JSON.parse(fs.readFileSync('products.json').toString());
    listaProductos.forEach(producto => {
      this.addProduct(producto)
    });
  }

  addProduct(nuevoProducto:Product) {
    // Si el producto no existe, entonces existeProducto tiene length 0, entonces agrego el producto.
    const listaProductos = this.getCosas();
    const existeProducto = listaProductos.filter(producto => nuevoProducto.id === producto.id);
    if (existeProducto.length === 0) { this.add(nuevoProducto) }
  }

  getProduct(id:number):Product {
    // Utilizo el utilitario find de lodash.
    const listaProductos = this.getCosas();
    return find(listaProductos, { 'id' : id })
  }

  removeProduct(id:number):Product {
    // Utilizo el utilitario remove de lodash.
    const listaProductos = this.getCosas();
    return remove(listaProductos, (elemento => elemento.id === id));
  }

  getSortedByPrice(order:sortType) {
    // Utilizo el utilitario orderBy de lodash.
    const listaProductos = this.getCosas();
    return orderBy(listaProductos, ['price'], order)
  }

}

export { ListaDeProductos, Product };
