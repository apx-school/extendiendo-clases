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
  constructor(name: string) {
    super(name);
    const archivo = fs.readFileSync(__dirname + "/products.json");
    const productos = JSON.parse(archivo);
    for (let i = 0; i < productos.length; i++) {
      const element = productos[i];
      this.addProduct(element);
    }
  }
  // cosas: Product[] = [];
  addProduct(producto: Product) {
    this.add(producto);
  }
  getProduct(id: number): Product {
    const productoBuscado = this.cosas.find((i) => {
      return i.id == id;
    });
    return productoBuscado;
  }
  removeProduct(id: number) {
    this.cosas.splice(0, id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    console.log(order);
    var arrayOrd: Product[] = [];
    if (order == "asc") {
      arrayOrd = orderBy(this.cosas, "price", "asc");
      console.log(arrayOrd);
    } else {
      arrayOrd = orderBy(this.cosas, "price", "desc");
    }
    return arrayOrd;
  }
}

export { ListaDeProductos, Product };
