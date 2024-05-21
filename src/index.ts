import products from "./products.json";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string, products: any[]) {
    this.name = name;
    this.cosas=products
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
    super(name, products);
  }

  getCosas(){
    return this.cosas
  }
  addProduct(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }

  removeProduct(id: number): Product {
    const cosa = this.cosas.find((cosa) => cosa.id === id);
    this.cosas = this.cosas.filter((cosa) => cosa.id !== id);
    return cosa;
  }

  getSortedByPrice(order: string): any {
    if (order === "asc") {
      return this.cosas.sort((a, b) => a.price - b.price);
    } else {
      return this.cosas.sort((a, b) => b.price - a.price);
    }
  }
  getProduct(id: number): Product {
    return this.cosas.find((cosa) => cosa.id === id);
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
