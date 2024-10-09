import * as fs from "fs";
import remove from "lodash/remove";
import orderBy from "lodash/orderBy";

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
  constructor(n: string) {
    // Llamada al constructor de la superclase: LisaDeCosas
    super(n);

    // Lógica adicional para leer products.json y agregar productos usando addProduct
    // ...
    const productJson = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelArchivo = JSON.parse(productJson);
    productosDelArchivo.forEach((p) => {
      this.addProduct(p);
    });

    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));
  }

  addProduct(product: Product): void {
    this.add(product);

    // Implementación del método addProduct
    // ...
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    // ...
    const cosas = this.getCosas();
    return cosas.find((p) => p.id == id);
  }

  removeProduct(id: number) {
    // Implementación del método removeProduct
    // ...
    remove(this.cosas, (p) => p.id == id);
  }

  getSortedByPrice(order: "asc" | "desc") {
    // Implementación del método getSortedByPrice
    // ...
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
