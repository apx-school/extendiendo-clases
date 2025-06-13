import * as fs from "fs";

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

    try {
      const data = fs.readFileSync("./src/products.json", "utf-8");
      const productsFromFile: Product[] = JSON.parse(data) || [];

      productsFromFile.forEach((p) => {
        this.addProduct(p);
      });
    } catch (error) {
      console.error("Error al leer products.json:", error);
    }
  }

  addProduct(product: Product): void {
    if (
      typeof product.name !== "string" ||
      typeof product.price !== "number" ||
      typeof product.id !== "number"
    ) {
      throw new Error("Parámetros inválidos para el producto.");
    }
    const exists = this.cosas.some((p) => p.id === product.id);
    if (!exists) {
      this.add(product);
    } else {
      console.log(`El producto con ID ${product.id} ya existe`);
    }
  }

  getProduct(id: number): Product | null {
    const gettingProduct = this.cosas.find((p) => p.id === id);
    return gettingProduct || null;
  }

  removeProduct(id: number): Product {
    const index = this.cosas.findIndex((p) => p.id === id);
    if (index !== -1) {
      const removedProduct = this.cosas[index];
      this.cosas.splice(index, 1);
      return removedProduct;
    }
    throw new Error(
      `No existe algún producto con el id:${id} y por lo tanto no se puede eliminar`
    );
  }

  getSortedByPrice(order: string): Product[] {
    const sortedProducts = [...this.cosas].sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
    return sortedProducts;
  }
}

export { ListaDeProductos, Product };

const listaUtiles = new ListaDeProductos("Producto 6");
console.log(listaUtiles.getSortedByPrice("desc"));
