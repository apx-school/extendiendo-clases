import products from "./products.json";
class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string, products: any[]) {
    // nombre de esta lista
    this.name = name;
    this.cosas = products;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
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
  constructor(name:string,)  {
      super(name, products);
  }
  getCosas() {
    return this.cosas;
  }

  addProduct(product:Product): void {
    this.cosas.push(product);
  }
  getProduct(id:number): Product {
    return this.cosas.find(product => product.id === id);
}

getSortedByPrice(order: string): Product[] {
  if (order === 'asc') {
    return this.cosas.slice().sort((a, b) => a.price - b.price);
  } else if (order === 'desc') {
    return this.cosas.slice().sort((a, b) => b.price - a.price);
  } else {
    return this.cosas.slice();
  }
}
removeProduct(id: number): Product {
  const product = this.cosas.find(product => product.id === id);
  if (product) {
    this.cosas = this.cosas.filter(product => product.id !== id);
  }
  return product;
}

}
export { ListaDeProductos, Product };


// class ListaDeProductos extends ListaDeCosas {
//   constructor(nombre: string) {
//     // Llamada al constructor de la superclase
//     super(nombre);

//     // Lógica adicional para leer products.json y agregar productos usando addProduct
//     // ...

//     // Ejemplo de cómo se puede invocar addProduct para agregar un producto
//     // this.addProduct(new Product(/* parámetros del producto */));
//   }

//   addProduct(product: Product): void {
//     // Implementación del método addProduct
//     // ...
//   }

//   getProduct(id: number): Product {
//     // Implementación del método getProduct
//     // ...
//   }

//   removeProduct(id: number): Product {
//     // Implementación del método removeProduct
//     // ...
//   }

//   getSortedByPrice(order: string): void {
//     // Implementación del método getSortedByPrice
//     // ...
//   }
// }
