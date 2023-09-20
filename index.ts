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
  constructor(name: string) {
    super(name);
    const productsInFileString = fs.readFileSync("./products.json").toString();
    const productsInFileCollection = JSON.parse(productsInFileString);
    productsInFileCollection.forEach((product: Product) =>
      this.addProduct(product)
    );
  }

  addProduct(product: Product) {
    const isThisProductPresent: boolean = this.cosas.includes(
      (iterationProduct: { id: number }) => iterationProduct.id === product.id
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
    lodash.remove(this.cosas, foundProduct);
    return foundProduct;
  }
  getSortedByPrice(order: string) {
    if (order == "asc") {
      return lodash.sortBy(this.cosas, [(product) => product.price]);
    } else if (order == "desc") {
      const orderedArray = lodash.sortBy(this.cosas, [
        (product) => product.price,
      ]);
      return orderedArray.reverse();
    } else {
      throw new Error("Entered order is invalid, retry with 'asc' or 'desc'");
    }
  }
}

export { ListaDeProductos, Product };
