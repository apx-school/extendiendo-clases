import * as fs from 'fs';
import * as findIndex from 'lodash/findIndex';
import * as find from 'lodash/find';
import * as remove from 'lodash/remove';
import * as orderBy from 'lodash/orderBy';
// import * as sortBy from 'lodash/sortBy';
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
    const prod = fs.readFileSync(__dirname + '/products.json');
    const productosParseado = JSON.parse(prod.toString());
    productosParseado.forEach((producto) => {
      // const nuevoProducto = new Product(producto.name, producto.price, producto.id);
      this.addProduct(producto);
    });
  }
  addProduct(product: Product) {
    if (findIndex(this.getCosas(), cosa => cosa.id === product.id) === -1) {
      this.add(product);
    }
  }
  getProduct(id: number): Product {
    return find(this.getCosas(), producto => producto.id === id);
  }
  removeProduct(id: number): Product {
    return remove(this.getCosas(), producto => producto.id === id);
  }
  getSortedByPrice(order: 'asc' | 'desc') {
    // Ejemplo con sortBy
    // if (order === 'asc') {
    //   return sortBy(this.getCosas());
    // } else if (order === 'desc') {
    //   return sortBy(this.getCosas()).reverse();
    // }
    // Ejemplo con orderBy
    return orderBy(this.getCosas(), ['price'], [order]);
  }
}

export { ListaDeProductos, Product };
