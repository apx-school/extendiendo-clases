import * as products from "./products.json";
import * as _ from "lodash";
class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa: any) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}
class ListaDeProductos extends ListaDeCosas {
  addProduct(product: Product) {
    if (!_.find(this.cosas, { id: product.id })) {
      this.add(product);
    } else {
      console.log("Ese ID ya esta registrado");
    }
  }
  constructor(name: string) {
    super(name);
    _.forEach(products, (element) => this.addProduct(element));
  }
  getProduct(id: number): Product {
    return _.find(this.cosas, { id: id });
  }
  removeProduct(id: number) {
    _.remove(this.cosas, (x) => x.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    const cosasSorted = _.sortBy(this.cosas, ["price"]);
    if (order == "asc") {
      return cosasSorted;
    } else {
      return _.reverse(cosasSorted);
    }
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

export { ListaDeProductos, Product };
