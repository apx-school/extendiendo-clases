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
    const leerArchivo = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const archivoParseado = JSON.parse(leerArchivo);

    archivoParseado.forEach((item) => {
      this.addProduct(item);
    });
  }
  addProduct(producto: Product) {
    const productId = this.cosas.includes(producto.id);
    if (!productId) {
      this.add(producto);
    }
  }
  getProduct(id: number): Product {
    return this.cosas.find((item) => item.id == id);
  }
  removeProduct(id: number) {
    remove(this.cosas, (item) => item.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
