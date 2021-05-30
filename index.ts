import * as _ from "lodash";
import * as fs from "fs";
class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
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
    const archivo = fs.readFileSync(__dirname + "/products.json").toString();
    const archivoParseado = JSON.parse(archivo);
    archivoParseado.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(producto: Product) {
    this.add(producto);
  }
  getProduct(id: number): Product {
    return this.getCosas().find((c) => c.id == id);
  }
  removeProduct(id: number) {
    return _.remove(this.cosas, (c) => c.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return _.orderBy(this.cosas, ["price"], [order]);
  }
}
export { ListaDeProductos, Product };
