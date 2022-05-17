import * as fs from "fs"
import * as remove from "lodash/remove"
import * as orderBy from "lodash/orderBy"
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
    const archivo = fs.readFileSync(__dirname + "/products.json").toString();
    const productosParse = JSON.parse(archivo);
    productosParse.forEach( (prod) => {
      this.addProduct(prod)
    });
  }
  addProduct(productos: Product) {
    const encontrarId = this.cosas.find((prod) => prod.id === productos.id);
    if (!encontrarId) {
      return this.add(productos)
    }
  }

  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find( (prod) => prod.id === id)
  }
  removeProduct(id: number) {
remove(this.cosas, (c) => c.id == id)
  
  }
  getSortedByPrice(order:"asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order])
  }
}

export { ListaDeProductos, Product };
