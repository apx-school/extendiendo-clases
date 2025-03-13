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

    const contenidoDelArchivo = fs.readFileSync(__dirname +"/products.json").toString();
    const productosDelArchivo = JSON.parse(contenidoDelArchivo);

    productosDelArchivo.forEach(p => {
      this.addProduct(p)
    });
  }

    addProduct(product: Product) {
      this.add(product)  
    }

    getProduct(id: number) {
      const cosas = this.getCosas();
      return cosas.find((cosa) => cosa.id == id);
    }

    removeProduct(id: number) {
      this.cosas = this.cosas.filter(product => product.id !== id);
  }  

  getSortedByPrice(order: "asc" | "desc") {
    return this.cosas.sort((a, b) => {
        if (order === "asc") {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
}

}

export { ListaDeProductos, Product };
