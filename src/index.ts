import fs from "fs";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
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
  productosArchivo: Product[];
  constructor(n: string) {
    super(n);
    const productsJson = fs.readFileSync(__dirname + "/products.json").toString();
    this.productosArchivo = JSON.parse(productsJson);
    this.cosas=this.productosArchivo

  }

  addProduct(product: Product): void {
    this.add(product);
    this.productosArchivo.push(product);
  }

  getProduct(id: number): Product {
    return this.productosArchivo.find(p=>p.id===id)

  };

  removeProduct(id: number) {
    const listaRenovada = this.productosArchivo.filter(product => product.id !== id);
    this.productosArchivo = listaRenovada;
    this.cosas = this.cosas.filter(p => p.id !== id); 
  fs.writeFileSync(__dirname + "/products.json", JSON.stringify(listaRenovada, null, 2));
  }

  getSortedByPrice(order: string): Product[] {
    return this.productosArchivo.sort((a: Product, b: Product) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };
};


export { ListaDeProductos, Product };
