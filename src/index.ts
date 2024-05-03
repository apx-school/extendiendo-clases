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
  constructor(name: string) {
    super(name);
    this.loadProducts();
  }

  loadProducts(): void {
    try {
      products.forEach((product: any) => {
        this.addProduct(new Product(product.name, product.price, product.id));
      });
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product {
    const tomarProducto = this.getCosas().find((p) => p.id === id);
    return tomarProducto;
  }

  removeProduct(id: number): Product {
    const productoIndex = this.getCosas().findIndex((pr) => pr.id === id);
    if (productoIndex !== -1) {
      const remove = this.getCosas().splice(productoIndex, 1)[0];
      return remove;
    } else {
      return null;
    }
  }

  getSortedByPrice(order: string): Product[] {
    const sortedProducts = this.getCosas().slice();
    if (order === "asce") {
      return sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      return sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      console.log('Comando equivocado, por favor ingresar "asce" o "desc"');
      return [];
    }
  }
}

export { ListaDeProductos, Product };


