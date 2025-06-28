import { ListaDeCosas } from "./index";
import * as fs from "fs";
import * as path from "path";

type Product = {
  id: number;
  name: string;
  price: number;
};

export class ListaDeProductos extends ListaDeCosas {
  constructor(nombre: string) {
    super(nombre);

    const filePath = path.resolve(__dirname, "products.json");
    const data = fs.readFileSync(filePath).toString();
    const products: Product[] = JSON.parse(data);

    products.forEach((product) => this.addProduct(product));
  }

  addProduct(product: Product): void {
    const productos = this.getCosas();
    const existe = productos.some((p: Product) => p.id === product.id);
    if (!existe) {
      this.add(product);
    }
  }

  getProduct(id: number): Product {
    return this.getCosas().find((p: Product) => p.id === id);
  }

  removeProduct(id: number): void {
    const productos = this.getCosas();
    const index = productos.findIndex((p: Product) => p.id === id);
    if (index !== -1) productos.splice(index, 1);
  }

  getSortedByPrice(order: string): Product[] {
    const productos = [...this.getCosas()];
    return productos.sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
  }
}
