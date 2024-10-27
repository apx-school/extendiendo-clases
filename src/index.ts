import * as fs from "fs";
import { orderBy } from "lodash";
import * as path from "path";

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
    // Llamada al constructor de la superclase: ListaDeCosas
    super(name);

    // Lógica adicional para leer products.json y agregar productos usando addProduct
    // ...
    const rutaArchivo = path.join(__dirname, "products.json");
    const contenidoDelArchivo = fs.readFileSync(rutaArchivo).toString();
    const productosDelArchivo = JSON.parse(contenidoDelArchivo);

    productosDelArchivo.forEach((p) => {
      this.addProduct(p);
    });
    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));
  }

  addProduct(product: Product): void {
    // Implementación del método addProduct
    // ...
    this.add(product);
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
    const cosasDeLista = this.getCosas();
    const eliminar = cosasDeLista.find((p) => p.id == id);
    this.cosas = cosasDeLista.filter((p) => eliminar !== p);
    return this.cosas;
  }

  getSortedByPrice(order: "asc" | "desc") {
    // Implementación del método getSortedByPrice
    // ...
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
