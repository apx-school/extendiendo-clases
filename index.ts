import * as fs from "fs";
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
    return this.cosas
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
  constructor(name: string,) {
    super(name); {
      const productsJson = fs.readFileSync(__dirname + "/products.json").toString();
      const productosDelArchivo = JSON.parse(productsJson);
      productosDelArchivo.forEach(e => {
        this.addProduct(e);
      });
    }
  }
  addProduct(product: Product) {
    this.add(product)
  }
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find(i => {
      return i.id == id;
    });

  }
  removeProduct(i: number) {
    remove(this.cosas, c => c.id == i)
  };
  getSortedByPrice(orden: string) {
    return orderBy(this.cosas, "price", orden);
  }
}

export { ListaDeProductos, Product };
