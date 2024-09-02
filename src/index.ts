import * as fs from "fs";
import remove from "lodash/remove";
import orderBy from "lodash/orderBy";

class ListaDeCosas {
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
      const contenidoDelArchivo = fs.readFileSync(__dirname + "/products.json").toString();
      const productosDelArchivo = JSON.parse(contenidoDelArchivo);
      
      productosDelArchivo.forEach((p: any) => {
        // Asegurarse de crear instancias de Product
        this.addProduct(new Product(p.name, p.price, p.id));
      });

    } catch (error) {
      console.error("Error reading or parsing products.json:", error);
    }
  }

  addProduct(product: Product) {
    this.add(product);
  }

  getProduct(id: number): Product | undefined {
    return this.getCosas().find((c: Product) => c.id === id);
  }

  removeProduct(id: number): Product | undefined {
    const productToRemove = this.getProduct(id);
    if (productToRemove) {
      remove(this.cosas, (c: Product) => c.id === id);
    }
    return productToRemove;
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
