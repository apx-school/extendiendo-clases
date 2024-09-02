import products from './products.json';
import orderBy from 'lodash/orderBy';

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

  constructor(name : string){
    super(name)
    const productosArchivos = products;

    productosArchivos.forEach(p => {
      this.addProduct(p);
    });  //agrego los productos del archivo json a la lista;
  }

  //metodos
  addProduct(product : Product): void {
    this.add(product);
  }

  getProduct(id: number): Product{
    return this.cosas.find(p => p.id === id) as Product;  //busco el producto por id y lo devuelvo como Producto;
  }

  removeProduct(id: number): Product {
    const index = this.cosas.findIndex(p => p.id === id);
    if(index !== -1){
      return this.cosas.splice(index, 1)[0];  //devuelvo el producto eliminado y lo saco de la lista;
    }
    return null;  //devuelvo null si no lo encuentro;
  }

  getSortedByPrice(order: "asc" | "desc"){
    
    return orderBy(this.cosas, ["price"], [order]); 

  }
}

export { ListaDeProductos, Product };
