import * as fs from "fs";
import { orderBy } from "lodash";
// import * as orderBy from "lodash/orderBy";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    //Nombre de Lista
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
  listProduct: Product[];
  lista: Product[];

  constructor(name: string, price: number, id: number) {
    super(name);
    this.listProduct = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
    this.listProduct.forEach((prod) => this.addProduct(prod));
  }
  //Add Product to list
  addProduct(producto: Product) {
    const productFinder = this.cosas.find((prod) => prod.id === producto.id);
    if (!productFinder) {
      this.add(producto);
    }
  }
  //Get product to list
  getProduct(id: number): Product {
    return this.cosas.find((prod) => prod.id === id);
  }
  // Remove product to list
  removeProduct(id: number) {
    this.cosas.map((prod, index) => {
      if (prod.id === id) {
        this.cosas.splice(index, 1);
      }
    });
  }

  // Get sorted by price
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
