import * as fs from "fs";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.concat(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(id: number, name: string, price: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    super(name);
    const contenidoArchivo = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelArchivo = JSON.parse(contenidoArchivo);
  }

  addProduct(product: Product) {
    this.add(product);
  }
  getProduct(id: number) {
    const res = this.cosas.find((p) => {
      return p.id == id;
    });
    return res;
  }
  removeProduct(id: number) {
    const productoAEliminar = this.cosas.find((p) => {
      return p.id == id;
    });
    this.cosas; // aca elimininamos el producto del la lista
  }
  getSortedByPrice() {}
}

export { ListaDeProductos, Product };
