import * as fs from "fs"
import * as remove from "lodash/remove"
import * as orderBy from "lodash/orderBy"

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
    const productsJson = fs.readFileSync(__dirname + "/products.json").toString();
    const productsJsonParseado = JSON.parse(productsJson);
    productsJsonParseado.forEach((element) => {
      this.addProduct(element);
    });
  }

  addProduct(product: Product) {
    this.add(product)
  }

  getProduct(id: number): Product {
    return this.getCosas().find(things => things.id == id);
  }

  removeProduct(id: number) {
    remove(this.cosas, things => things.id == id) //es parecido a filter pero en vez de filtrar directamente remueve ese elemento
  }

  getSortedByPrice(order: "asc" | "desc") {
    //hardcode: escribir un valor que deberia ser una varible pero escrita a mano
    return orderBy(this.cosas, ["price"], [order])
  }
}

export { ListaDeProductos, Product };
