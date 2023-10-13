import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

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
    const archivoJson = fs.readFileSync("./products.json").toString();
    const productosDelArchivo = JSON.parse(archivoJson);
    productosDelArchivo.forEach((element) => {
      this.addProduct(element);
    });
  }
  addProduct(producto: Product) {
    const productoExistente = this.cosas.find((p) => p.id === producto.id);
    if (productoExistente) {
      console.log("Ya existe un producto con el mismo Id.");
      return; // Salir del método si ya existe un producto con el mismo id.
    }
    // Agregar el producto utilizando el método "add" de la superclase.
    this.add(producto);
  }
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((p) => p.id === id);
  }
  removeProduct(id: number) {
    const idEliminado = remove(this.cosas, (c) => c.id === id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    const o = orderBy(this.cosas, ["price"], [order]);
    return o;
  }
}
export { ListaDeProductos, Product };
