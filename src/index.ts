export class ListaDeCosas {
  name: string;
  cosas: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  add(nuevaCosa: any) {
    this.cosas.push(nuevaCosa);
  }

  getCosas() {
    return this.cosas;
  }
}

export class Product {
  name: string;
  price: number;
  id: number;

  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

import * as fs from "fs";
import * as path from "path";

export class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    super(name);

    const filePath = path.resolve(__dirname, "products.json");
    const contenido = fs.readFileSync(filePath).toString();
    const productos: Product[] = JSON.parse(contenido);

    productos.forEach((p) => this.addProduct(p));
  }

  addProduct(product: Product): void {
    const existe = this.getCosas().some((p: Product) => p.id === product.id);
    if (!existe) {
      this.add(product);
    }
  }

  getProduct(id: number): Product | undefined {
    return this.getCosas().find((p: Product) => p.id === id);
  }

  removeProduct(id: number): void {
    const index = this.getCosas().findIndex((p: Product) => p.id === id);
    if (index !== -1) {
      this.getCosas().splice(index, 1);
    }
  }

  getSortedByPrice(order: "asc" | "desc"): Product[] {
    const copia = [...this.getCosas()];
    return copia.sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
  }
}
