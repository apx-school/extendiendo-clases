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
    const llamarLista = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const parsear = JSON.parse(llamarLista);
    parsear.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(productoNuevo: Product) {
    return this.add(productoNuevo);
  }
  getProduct(id: number): Product {
    const buscaCosas = this.getCosas();
    return buscaCosas.find((cosas) => 
      cosas.id == id
    );
  }
  removeProduct(id: number): Product {
    const eliminarUnaCosa = remove(this.cosas, (i) => 
      i.id == id);
    return eliminarUnaCosa;
  }
  getSortedByPrice(order: "asc" | "desc") {
    const resultado = orderBy(this.cosas, ["price"], order);
    return resultado;
  }
}

export { ListaDeProductos, Product };
