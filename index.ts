import * as fs from "fs";
import * as orderBy from "lodash/orderBy";
import * as remove from "lodash/remove";
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
    const archivoOriginal = fs.readFileSync(__dirname + "/products.json");
    const archivoString = archivoOriginal.toString();
    const archivoDatos = JSON.parse(archivoString);
    archivoDatos.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(unProducto: Product) {
    var elProducto = this.cosas.find(function (item: any) {
      if (item.id == unProducto.id) {
        return unProducto;
      }
    });
    if (elProducto != unProducto) {
      this.add(unProducto);
    }
  }

  getProduct(id: number): Product {
    var idProducto = this.cosas.find(function (item: any) {
      if (item.id == id) {
        return item;
      }
    });
    return idProducto;
  }
  removeProduct(id: number): Product {
    return remove(this.cosas, (p) => p.id == id);
  }
  getSortedByPrice(order: string) {
    type order = "asc" | "desc";
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
