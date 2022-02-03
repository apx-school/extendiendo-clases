import * as products from "./products.json";
import * as find from "lodash/find";
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
    super(name);
    this.addProducts(products);
  }
  addProducts(array: Array<Product>) {
    array.forEach((item: Product) => {
      this.addProduct(item);
    });
  }
  addProduct(product: Product) {
    if (!find(this.getCosas(), (item: Product) => item.id === product.id)) {
      this.add(product);
    }
  }
  getProduct(id: number): Product {
    return find(this.getCosas(), (item: Product) => item.id === id);
  }
  removeProduct(id: number) {
    remove(this.getCosas(), (item: Product) => item.id === id);
  }
  getSortedByPrice(order: "desc" | "asc") {
    return orderBy(this.getCosas(), "price", order);
  }
}

export { ListaDeProductos, Product };
