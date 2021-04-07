import * as fs from "fs";
import * as lodash from "lodash";
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
  getCosas(): any[] {
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
    const productsJSON = JSON.parse(
      fs.readFileSync(__dirname + "/products.json").toString()
    );
    productsJSON.forEach((item) => {
      this.add(item);
    });
  }
  addProduct(product: Product) {
    const cosas = this.getCosas();
    cosas.forEach((item) => {
      if (item.id == product.id) {
        return;
      }
    });
    this.add(product);
  }
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((item) => item.id == id);
  }
  removeProduct(id: number) {
    const cosas = this.getCosas();
    cosas.forEach((item: any, i) => {
      if (item.id == id) {
        removeElementArray(i);
      }
    });
    function removeElementArray(index: number) {
      cosas.splice(index, 1);
    }
  }
  getSortedByPrice(order: "asc" | "desc") {
    return lodash.orderBy(this.cosas, ["price"], [order]);
  }
}
export { ListaDeProductos, Product };
