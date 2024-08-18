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
    // Llamada al constructor de la superclase: LisaDeCosas
    super(name)
    const productsJson = fs.readFileSync(__dirname + "/products.json").toString() //es el directorio actual para que lea products.json
    const productosDelArchivo = JSON.parse(productsJson);

    productosDelArchivo.array.forEach((p) => {
      this.addProduct(p);
    });
    
  }

  addProduct(product: Product): void { //recibe una instancia de la clase product 
    this.add(product); //agrega el producto
  }

  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((c) => (c.id == id)); 
  }

  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id == id);
  }

  getSortedByPrice(order: string): void {
    return orderBy(this.cosas, ["price"], [order]);
  }
}


export { ListaDeProductos, Product };