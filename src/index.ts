import * as fs from "fs";
import remove from "lodash/remove";
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
  constructor(nombre: string) {
    // Llamada al constructor de la superclase: LisaDeCosas
    super(nombre);

    const productsJSON = fs.readFileSync(__dirname + "/products.json").toString();
    const productosDelArchivo = JSON.parse(productsJSON);

    productosDelArchivo.forEach(p => {
      this.addProduct(p);
    });

    // Lógica adicional para leer products.json y agregar productos usando addProduct
    // ...

    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));
  }

  addProduct(product: Product): void {
    // Implementación del método addProduct
    this.add(product); //add se encuentra en la clase padre
  }

  getProduct(id: number): Product {
    // Busco el id en el array de cosas
    const producto = this.cosas.find(p => p.id == id)
    return producto;
  }

  removeProduct(id: number) {
    // Implementación del método removeProduct
    remove(this.cosas, (c) => c.id == id)

  }

  getSortedByPrice(order: "asc" | "desc"): any[] { //esta declaracion de order limita los posibles strings
    // Implementación del método getSortedByPrice
    return orderBy(this.cosas, ["price"],[order]);
    
  }
}

export { ListaDeProductos, Product };
