import * as fs from "fs";
import * as path from 'path';
import  remove from "lodash/remove";
import  orderBy from "lodash/orderBy";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];

  constructor(name: string, cosas: any[]) {
    this.name = name;
    this.cosas = cosas;
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
  super(name,[]);

  const contenidoDelArchivo = fs.readFileSync(path.join(__dirname, "products.json")).toString();
  const productosDelArchivo = JSON.parse(contenidoDelArchivo);

  if (Array.isArray(productosDelArchivo)) {
  productosDelArchivo.forEach((p) => {
    
    this.add(p);
  
  });
} else {
  console.error('El contenido de products.json no es un array.');
}
}

  addProduct(product: Product){
    this.add(product);
}

getProduct(id :number): Product{
  const cosas = this.getCosas();
  return cosas.find((c) => c.id === id);
}

removeProduct(id : number): boolean {
  const initialLength = this.cosas.length; // Longitud inicial
  remove(this.cosas, (c) => c.id === id); // Elimina el producto
  return this.cosas.length < initialLength; // Retorna true si se eliminó
}



getSortedByPrice(order: "asc" | "desc"){
  return orderBy(this.cosas, ["price"], [order]);
  
}
}

export { ListaDeProductos, Product };



/*
1. Error en el Test de Carga de products.json
El primer error indica que el test espera un array de objetos simples, pero está recibiendo instancias de la clase Product. Esto se debe a que el test está comparando los objetos 
en su forma original.

Solución
Para que el test pase, puedes ajustar la forma en que se están agregando los productos. En lugar de crear instancias de Product, podrías simplemente agregar los objetos directamente. 
Sin embargo, esto no es lo ideal si quieres mantener la lógica de tu aplicación.

productosDelArchivo.forEach((p) => {
  this.add(p); // Agrega el objeto directamente
});

*/