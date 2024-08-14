import products from "./products.json"
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
    const objProductos: { id: number; name: string; price: number }[] = products;
    objProductos.forEach(element => {
      this.add({
        id: element.id,
        name: element.name,
        price: element.price,
      });
    });
  }

  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product | undefined {
    return this.cosas.find((a: Product) => a.id === id);
  }

  removeProduct(id: number): Product | undefined {
    const index = this.cosas.findIndex((a: Product) => a.id === id);
    if (index !== -1) {
      return this.cosas.splice(index, 1)[0];
    }
    return undefined;
  }

  getSortedByPrice(order: 'asc' | 'desc'): Product[] {
    return [...this.cosas].sort((a: Product, b: Product) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }
}

export { ListaDeProductos, Product };
