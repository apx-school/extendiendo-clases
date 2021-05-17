import * as fs from "fs";
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
    const js = fs.readFileSync(__dirname + "/products.json").toString();
    const productos = JSON.parse(js);
    productos.forEach((element) => {
      return this.addProduct(element);
    });
  }
  addProduct(unProducto: Product) {
    this.add(unProducto);
  }
  getProduct(id: number): Product {
    const losProducts = this.cosas;
    return losProducts.find((p) => p.id == id);
  }
  removeProduct(id: number): Product {
    const losProducts = this.getCosas();
    return remove(
      losProducts,
      losProducts.find((i) => id == i.id)
    );
  }
  getSortedByPrice(order: "asc" | "desc"): Product[] {
    const losProducts = this.getCosas();
    const losProductsOrdenados = orderBy(losProducts, ["price"], [order]);
    return losProductsOrdenados;
  }
}
const listaCelus = new ListaDeProductos("celulares");
console.log(listaCelus.getSortedByPrice("asc"));

export { ListaDeProductos, Product };
