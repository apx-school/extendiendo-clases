import products from "./products.json";

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
    // Llamada al constructor de la superclase: LisaDeCosas
    super(n);

    // Lógica adicional para leer products.json y agregar productos usando addProduct
    // ...
    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));
    for (let p of products) {
      this.addProduct(p);
    }
  }

  addProduct(product: Product): void {
    // Implementación del método addProduct
    // ...
    const encontrado = this.cosas.includes((p) => p.id === product.id);
    if (!encontrado) {
      this.cosas.push(product);
    }
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    // ...
    const encontrado = this.cosas.find((p) => p.id === id);
    if (encontrado !== undefined) return encontrado;
  }

  removeProduct(id: number): void {
    // Implementación del método removeProduct
    // ...
    const listaFiltrada = this.cosas.filter((p) => p.id !== id);
    this.cosas = listaFiltrada;
  }

  getSortedByPrice(order: string): Product[] {
    // Implementación del método getSortedByPrice
    // ...
    let listaOrdenada = this.cosas;
    if (order === "asc") {
      listaOrdenada.sort((a, b) => a.price - b.price);
    } else {
      listaOrdenada.sort((a, b) => b.price - a.price);
    }
    return listaOrdenada;
  }
}

export { ListaDeProductos, Product };
