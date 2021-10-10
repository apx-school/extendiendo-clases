import * as fs from "fs";
import * as _ from "lodash";

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

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    super(name);
    const archivo = fs.readFileSync(__dirname + "/products.json");
    const archivoATexto = archivo.toString();
    const archivoAObjetos = JSON.parse(archivoATexto);
    archivoAObjetos.map((d) => {
      return this.addProduct(d);
    });
  }
  addProduct(producto: Product) {
    const arrayDeIds = this.cosas.map((a) => {
      return a.id;
    });
    if (arrayDeIds.includes(producto.id)) {
      this.cosas = this.cosas;
    } else {
      this.add(producto);
    }
  }
  getProduct(id: number): Product {
    const productoEncontrado = _.find(this.cosas, function (o) {
      return o.id == id;
    });
    return productoEncontrado;
  }
  removeProduct(id: number): Product {
    const productoEncontrado = _.find(this.cosas, function (o) {
      return o.id == id;
    });
    return _.pull(this.cosas, productoEncontrado);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return _.orderBy(this.cosas, "price", order);
  }
}

export { ListaDeProductos, Product };
