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
  constructor(name: string) {
    super(name);
    const productsFromArchive = fs.readFileSync('./products.json');
    const listOfProducts = JSON.parse(productsFromArchive.toString());

    listOfProducts.forEach((p: Product) => {
      return this.addProduct(p);
    });
  }

  addProduct(product: Product) {
    return this.add(product);
  }

  getProduct(id: number): Product {
    return this.cosas.find((p) => {
      return id == p.id;
    });
  }

  removeProduct(id: number) {
    const idsNotRemoved = this.cosas.filter((p) => {
      return p.id != id;
    });

    return (this.cosas = idsNotRemoved);
  }

  getSortedByPrice(order: string) {
    if (order == 'asc') {
      return this.cosas;
    } else if (order == 'desc') {
      return this.cosas.reverse();
    }
  }
}

export { ListaDeProductos, Product };
