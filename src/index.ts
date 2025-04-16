const fs = require("fs");
var _ = require("lodash");

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

    // Lógica adicional para leer products.json y agregar productos usando addProduct
    const data = fs.readFileSync("./src/products.json", "utf8");
    const json = JSON.parse(data);

    json.forEach((product) => {
      this.addProduct(product);
    });
    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));
  }

  addProduct(product: Product): void {
    // Implementación del método addProduct
    this.add(product);
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    const cosas = this.getCosas();
    const cosaEncontrada = cosas.find((cosa) => cosa.id == id);
    return cosaEncontrada;
  }

  removeProduct(id: number) {
    // Implementación del método removeProduct
    const cosas = this.getCosas();
    const cosasFiltradas = cosas.filter((cosa) => cosa.id !== id);
    this.cosas = cosasFiltradas;
  }

  getSortedByPrice(order: "asc" | "desc"): Product[] {
    // Implementación del método getSortedByPrice
    const cosas = this.getCosas();
    if (order === "desc") {
      return cosas.sort((a, b) => b.price - a.price);
    } else {
      return cosas.sort((a, b) => a.price - b.price);
    }
  }
}

export { ListaDeProductos, Product };
