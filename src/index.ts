import fs from "fs";
import {remove}  from "lodash"; 

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
  constructor(n: string) {
    // Llamada al constructor de la superclase: ListaDeCosas
    super(n);
    const contenido = fs.readFileSync(__dirname + '/products.json', 'utf-8').toString();
    const productsFile = JSON.parse(contenido);
    productsFile.forEach((p) => {
      this.addProduct(p);
    });

  }

  addProduct(product: Product): void {
    // Implementación del método addProduct
    this.add(product);
    
    
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    return this.cosas.find((c)=> c.id === id);
  }

  removeProduct(id: number) {
    // Implementación del método removeProduct
    remove(this.cosas, ((c) => c.id == id));
  }

  getSortedByPrice(order: string): Product[] {
    // Implementación del método getSortedByPrice
     return this.cosas.sort((a,b)=> order === "asc" ? a.price - b.price : b.price - a.price);
  }
}

export { ListaDeProductos, Product };
