import * as fs from "fs";
import remove from "lodash/remove";  
import orderBy from "lodash/orderBy";  

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
    const productoDelArchivo = JSON.parse(contenidoDelArchivo);

    productoDelArchivo.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product | undefined {
    const cosas = this.getCosas();
    return cosas.find((cosa) => cosa.id == id);
  }

  removeProduct(id: number): Product | undefined {
    const productToRemove = this.getProduct(id); 
    if (productToRemove) {
      remove(this.cosas, (c) => c.id === id); 
    }
    return productToRemove; 
  }

  getSortedByPrice(order: "asc" | "desc"): Product[] {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
