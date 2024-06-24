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
    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    const json = fs.readFileSync(__dirname + "/products.json").toString();
    const productos = JSON.parse(json);
    productos.forEach((e) => {
      this.addProduct(e);
    });
  }

  addProduct(product: Product): void {
    const exists = this.cosas.find((cosa) => cosa.id === product.id);

    if (!exists) {
      this.add(product);
    } else {
      console.log(`El producto con ID ${product.id} ya existe.`);
    }
  }

  getProduct(id: number): Product {
    const cosas = this.cosas;
    return cosas.find((cosa) => cosa.id === id);
  }

  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id === id);
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price", [order]]);
  }
}

export { ListaDeProductos, Product };
