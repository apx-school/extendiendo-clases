import * as fs from "fs";
import * as lodash from "lodash";

class ListaDeCosas {
  // superclass de ListaDeProductos
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
  // subclass de ListaDeCosas
  super(name: string) {
    this.name = name;
    const productsInFileString = JSON.stringify(
      fs.readFileSync("./products.json")
    );
    const productsInFileCollection = JSON.parse(productsInFileString);
    productsInFileCollection.forEach((product: Product) =>
      this.addProduct(product)
    );
  }
  addProduct(product: Product) {
    const isThisProductPresent: boolean = this.cosas.includes(
      (iterationProduct) => iterationProduct.id === product.id
    );
    if (!isThisProductPresent) {
      this.add(product);
    } else {
      throw new Error("Selected product is already loaded");
    }
  }
  getProduct(id: number): Product {
    return this.cosas.find((product) => product.id === id);
  }
  removeProduct(id: number): Product {
    const foundProduct = this.cosas.find((product) => product.id === id);
    this.cosas.splice(foundProduct.index, 1);
    return foundProduct;
  }
  getSortedByPrice(order: string = "asc" || "desc") {
    if (order === "asc") {
      lodash.sortBy(this.cosas, [(product) => product.price]);
    } else if (order === "desc") {
      const orderedArray = lodash.sortBy(this.cosas, [
        (product) => product.price,
      ]);
      orderedArray.reverse();
    } else {
      throw new Error("Entered order is invalid, retry with 'asc' or 'desc'");
    }
  }
}

export { ListaDeProductos, Product };
