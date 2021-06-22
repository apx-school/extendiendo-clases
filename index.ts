const fs = require("fs");
const data = fs.readFileSync("products.json");

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
    type Order = "asc" | "desc";
    const collection = JSON.parse(data.toString());
    collection.forEach((element) => {
      this.cosas.push(element);
    });
  }

  addProduct(producto: Product) {
    this.add(producto);
  }

  getProduct(id: number): Product {
    return this.cosas.find((elem) => {
      return elem.id == id;
    });
  }

  removeProduct(id: number) {
    this.cosas = this.cosas.filter((item) => {
      return item.id != id;
    });
  }

  getSortedByPrice(order) {
    if (order == "asc") {
      return this.cosas.sort((a: Product, b: Product) => {
        return a.price - b.price;
      });
    } else {
      return this.cosas.sort((a: Product, b: Product) => {
        return b.price - a.price;
      });
    }
  }
}

export { ListaDeProductos, Product };
