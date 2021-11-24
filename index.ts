import * as fs from "fs";

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
    const contenidoDelArchivo = fs
      .readFileSync(__dirname + "./products")
      .toString();
    const productosDelArchivo = JSON.parse(contenidoDelArchivo);
    productosDelArchivo.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(product: Product) {
    this.add(product);
  }

  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((c) => c.id == id);
  }
  // // removeProduct() {}
  // getSortedByPrice() {}
}

export { ListaDeProductos, Product };
