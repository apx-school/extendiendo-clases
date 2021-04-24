import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";
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
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelarchivo = JSON.parse(contenidoDelArchivo);
    productosDelarchivo.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(producto: Product) {
    this.add(producto);
  }

  getProduct(id: number): Product {
    const cosas = this.getCosas();
    const cosaEncontrada = cosas.find((p) => {
      if (p.id == id) {
        return p;
      }
    });
    return cosaEncontrada;
  }

  removeProduct(id: number) {
    const cosas = this.getCosas();
    remove(cosas, function (n) {
      return n.id == id;
    });
  }
  getSortedByPrice(order: string) {
    const cosas = this.getCosas();
    return orderBy(cosas, ["name"], [order]);
  }
}

function main() {}
main();

export { ListaDeProductos, Product };
