import * as fs from "fs";
import * as pull from "lodash/pull";

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
    const productsJSON = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosParseados = JSON.parse(productsJSON);
    productosParseados.forEach((x) => this.addProduct(x));
  }
  addProduct(product: Product) {
    var productID = product.id;
    if (this.cosas.find((x) => x["id"] == productID)) {
      console.log("el producto fue agregado previamente");
    } else {
      return this.add(product);
    }
  }
  getProduct(id: number): Product {
    const findProduct = this.cosas.find((x) => x["id"] == id);
    return findProduct;
  }
  removeProduct(id: number): Product {
    const findProduct = this.cosas.find((x) => x["id"] == id);
    const removeProduct = pull(this.cosas, findProduct);
    return removeProduct;
  }
  getSortedByPrice(order: "asc" | "desc") {
    if (order == "asc") {
      return this.cosas.sort((a, b) => a["price"] - b["price"]);
    } else {
      return this.cosas.sort((a, b) => b["price"] - a["price"]);
    }
  }
}

export { ListaDeProductos, Product };
