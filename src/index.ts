import fs from 'fs';
import { orderBy } from "lodash";

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
    // Llamada al constructor de la superclase: ListaDeCosas
    super(name);

    // Lógica adicional para leer products.json y agregar productos usando addProduct
    const data = fs.readFileSync(__dirname + '/products.json').toString();
    const productos = JSON.parse(data);
    productos.forEach(prod => this.addProduct(prod));  
  }

  addProduct(product:Product): void {
    // Implementación del método addProduct
    this.add(product);
  }

  getProduct(id:number):Product {
    // Implementación del método getProduct
    const products = this.getCosas();
    return products.find(prod => prod.id === id); 
  }

  removeProduct(id:number):Product {
    // Implementación del método removeProduct
    const productoAEliminar = this.cosas.findIndex(prod => prod.id === id);
    
    const productoEliminado = this.cosas.splice(productoAEliminar, 1);

    return productoEliminado[0];
  }

  getSortedByPrice(order: "asc" | "desc") {
    // Implementación del método getSortedByPrice
    return orderBy(this.cosas, ['price'], [order]);
  }
}

export { ListaDeProductos, Product };