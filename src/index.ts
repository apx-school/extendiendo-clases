import products from "./products.json";
import { orderBy } from "lodash";

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
    return this.cosas; // .map((p) => ({ id: p.id, name: p.name, price: p.price }));
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

    //* Solución corta:
    /* products.forEach((p) => {
      this.addProduct(p);
    }); */

    //* Mi solución:
    for (let i = 0; i < products.length; i++) {
      const id = products[i].id;
      const nombre = products[i].name;
      const precio = products[i].price;
      const nuevoProducto = new Product(nombre, precio, id);
      const nuevoProductoFormateado = {
        id: nuevoProducto.id,
        name: nuevoProducto.name,
        price: nuevoProducto.price,
      };
      this.addProduct(nuevoProductoFormateado);
    }
  }
  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product {
    return this.cosas.find((p) => p.id == id);
  }

  removeProduct(id: number) {
    const i = this.cosas.findIndex((p) => p.id === id);
    if (i !== -1) {
      this.cosas.splice(i, 1);
    }
  }

  getSortedByPrice(order: "asc" | "desc"): void {
    if (order == "asc") {
      return orderBy(this.cosas, "price", "asc");
    } else if (order == "desc") {
      return orderBy(this.cosas, "price", "desc");
    }
  }
}

export { ListaDeProductos, Product };
