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

    const contenidoDelJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelJson = JSON.parse(contenidoDelJson);
    productosDelJson.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(producto: Product) {
    this.add(producto);
  }

  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((c) => c.id == id);
  }
  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id == id); // el remove sirve para modificar el array original
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]); // orderby ordena un array dependeindo del parametro que le pasmos despues  del nombre del array
  }
}

export { ListaDeProductos, Product };
