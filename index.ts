import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

function recibirDatos() {
  const archivo = fs.readFileSync(__dirname + "/products.json");
  const productos = JSON.parse(archivo.toString());
  return productos;
}

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
    const productos = recibirDatos();
    productos.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(unProducto: Product) {
    const idIgual = this.cosas.find((c) => {
      return unProducto.id == c.id;
    });
    if (!idIgual) {
      this.add(unProducto);
    }
  }
  getProduct(id: number): Product {
    return this.cosas.find((c) => {
      return c.id == id;
    });
  }
  removeProduct(id: number): Product {
    return remove(this.cosas, (p) => {
      return id == p.id;
    });
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
