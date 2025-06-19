import { log } from "console";
import products from "./products.json";
import * as fs from "fs";

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
  Productos: Product[];
  constructor(name: string) {
    super(name);
    const data = fs.readFileSync("src/products.json", "utf-8");
    const prodList = JSON.parse(data);
    this.cosas = prodList;
  }
  getCosas(): Product[] {
    return this.cosas;
  }
  addProduct(p: Product): void {
    const result = this.cosas.find(
      (currentProds: Product) => currentProds.id == p.id
    );
    if (!result) {
      this.cosas.push(p);
      fs.writeFileSync(
        "src/products.json",
        JSON.stringify(this.cosas, null, 2)
      );
    } else {
      console.error(
        "addProduct : producto existente en la lista de Productos actual."
      );
    }
  }
  getProduct(productId: number) /* :Product */ {
    const result = this.cosas.find((p: Product) => p.id == productId);
    if (result) {
      return result;
    } else {
      console.error(
        "getProduct : producto con el ID otorgado no ha sido encontrado."
      );
    }
  }
  removeProduct(id: number): void {
    const result = this.cosas.filter((p, index) => {
      if (p.id == id) {
        this.cosas.splice(index);
      }
    });
  }
  saveInJSON() {
    fs.writeFileSync("src/products.json", JSON.stringify(this.cosas));
  }
  getSortedByPrice(order: string) /* : Product[] */ {
    if (order == "desc") {
      const result = this.cosas.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        } else if (a.price > b.price) {
          return -1;
        } else {
          return 0;
        }
      });
      return result;
    } else {
      const result = this.cosas.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        } else if (a.price < b.price) {
          return -1;
        } else {
          return 0;
        }
      });
      return result;
    }
  }
}

export { ListaDeProductos, Product };
