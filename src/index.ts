import products from "./products.json";
import { orderBy, remove } from "lodash";

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
  cosas: Product[] = [];
  constructor(nombre: string) {
    // Llamada al constructor de la superclase
    super(nombre);

    // Lógica adicional para leer products.json y agregar productos usando addProduct
    // ...
    this.cosas = products;
    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));
  }

  addProduct(product: Product): void {
    // Implementación del método addProduct
    // ...
    this.cosas.push(product);
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    // ..
    const productoBuscado = this.cosas.find((cosas) => cosas.id == id);
    return productoBuscado;
  }

  removeProduct(id: number): Product {
    // Implementación del método removeProduct
    // ...
    return remove(this.cosas, (cosas) => cosas.id == id);
  }

  getSortedByPrice(order: string): void {
    // Implementación del método getSortedByPrice
    // ...
    return (this.cosas = orderBy(this.cosas, ["price"], [order]));
  }
}

export { ListaDeProductos, Product };

//const lista = new ListaDeProductos("listita");
// console.log(lista);
// const unoPorId = lista.getProduct(2);
// console.log(unoPorId);
// lista.removeProduct(2);
// console.log(lista);
// lista.getSortedByPrice("desc");
// console.log(lista);
// lista.getSortedByPrice("asc");
// console.log(lista);

//const myP = { price: 33, id: 123, name: "mi producto" };
// lista.addProduct(myP);
// console.log(lista);
