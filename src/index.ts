import productsJSON from "./products.json";

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
    super(n);
    for (const product of productsJSON) {
      this.addProduct(product);
    }
  }

  addProduct(product: Product): void {
    const exist = this.getCosas().some((item) => item.id === product.id);

    if (!exist) {
      this.add(product);
    }
  }

  getProduct(idBuscado: number): Product {
    for (const cosa of this.getCosas()) {
      if (cosa.id === idBuscado) {
        return cosa;
      }
    }
  }

  removeProduct(idBuscado: number): Product {
    const index = this.getCosas().findIndex((item) => item.id === idBuscado);

    if (index !== -1) {
      const prodAEliminar = this.getCosas()[index];
      this.getCosas().splice(index, 1);
      return prodAEliminar;
    }
  }

  getSortedByPrice(order: string): Product[] {
    if (order === "asc") {
      return this.getCosas().sort((a, b) => a.price - b.price); // Orden ascendente
    } else if (order === "desc") {
      return this.getCosas().sort((a, b) => b.price - a.price); // Orden descendente
    } else {
      throw new Error('El parámetro "order" debe ser "asc" o "desc".'); // Manejo de errores
    }
  }

}

export { ListaDeProductos, Product };

