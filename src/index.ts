import { prototype } from 'events';
import * as fs from 'fs';

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
  constructor(nombre: string) {
    // Llamada al constructor de la superclase
    super(nombre);
    const contenido = fs.readFileSync(__dirname + '/products.json').toString();
    const productosDelArchivo = JSON.parse(contenido);
    productosDelArchivo.forEach(element => {
      this.addProduct(element);
    });
    
    // Lógica adicional para leer products.json y agregar productos usando addProduct
    // ...

    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));
  }

  addProduct(product: Product) {
    this.add(product);

    // Implementación del método addProduct
    // ...
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    let selected = this.cosas.find((p)=> p.id == id);
    return selected;
  }

  removeProduct(id: number) {
    // Implementación del método removeProduct
    let index = this.cosas.indexOf((p) => p.id == id);
    this.cosas.splice(index, 1);
    // ...
  }

  getSortedByPrice(order: "asc"|"desc") {
    // Implementación del método getSortedByPrice

    if (order == "asc"){
      return this.cosas.sort((a,b)=> a.price - b.price);
    } if (order == "desc") {
      return this.cosas.sort((a,b)=> b.price - a.price);
    }
    // ...
  } 
}

export { ListaDeProductos, Product };
