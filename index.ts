import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

const fs = require("fs");

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
  products: Product[] = [];
  
  constructor(name: string) {
    super(name);
    const datosProductos = fs.readFileSync(__dirname + "/products.json");
    const datosProductosEnTexto = datosProductos.toString();
    const productos = JSON.parse(datosProductosEnTexto);
    
    productos.forEach(producto => {
      this.addProduct(producto);
    });
  }

  addProduct(newProduct: Product) {
    const cosas = this.getCosas();
    const exists = cosas.find(c => c.id == newProduct.id);
    if(!exists) {
      this.add(newProduct);
    } 
    else {
      throw new Error("Error: ya existe un producto con ese id");      
    }    
  }

  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find(c => c.id == id);
  }

  removeProduct(id: number) {
    remove(this.cosas, this.cosas.find(c => c.id == id));
  }
  
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
