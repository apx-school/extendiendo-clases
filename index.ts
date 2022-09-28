import * as products from "./products.json";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
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
  products: Product[];

  constructor(name: string) {
    super(name);
    products.forEach((product) => this.addProduct(product));
  }

  addProduct(product: Product) {
    if (this.cosas.find((thing) => thing.id == product.id)) {
      console.log("Error: The product is already registered.");
    } else {
      this.add(product);
    }
  }
  getProduct(id: number): Product {
    return this.cosas.find((product) => product.id == id);
  }
  removeProduct(id: number) {
    const productIndex = this.cosas.findIndex((product) => product.id == id);
    this.cosas.splice(productIndex);
  }
  getSortedByPrice(order: "asc" | "desc") {
    if (order == "asc") {
      this.cosas.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    }
    if (order == "desc") {
      this.cosas.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    }
    return this.cosas;
  }
}

export { ListaDeProductos, Product };
