import * as productos from "./products.json";
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
  //constructor de la clase con super en name
  constructor(name: string) {
    super(name);
    //agrega todos los productos del json
    productos.forEach((item) => {
      this.addProduct(item);
    });
  }

  //agrega un producto a la lista
  addProduct(product: Product) {
    //si no existe un producto con el mismo id, lo agrega
    if (!this.getProduct(product.id)) {
      this.add(product);
    }
  }
  //getProduct devuleve el producto con id = id
  getProduct(id: number) {
    return this.cosas.find((item) => item.id === id);
  }
  //removeProduct elimina el producto con id = id
  removeProduct(id: number) {
    this.cosas = this.cosas.filter((item) => item.id !== id);
  }
  //getSortedByPrice devuelve un array de productos ordenados por precio ascendente o descendente
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, "price", order);
  }
}

export { ListaDeProductos, Product };
