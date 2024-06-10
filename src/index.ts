import * as products from "./products.json"

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
  productosParseados:Product[]

  constructor(name: string) {
    super(name)
    this.productosParseados = products.map((product:any) => new Product(product.name, product.price, product.id));
    this.addProduct(new Product("Leche", 1200, 5));
  }

  addProduct(product:Product):void{
    const existingProduct = this.productosParseados.find((p) => p.id = product.id);
    if (!existingProduct) {
      this.productosParseados.push(product);
    } else {
      console.log(`El producto con id ${product.id} ya existe.`);
    }
  }
  
  getProduct(id:number):Product {
    for (let i = 0; i < this.productosParseados.length; i++) {
        if (this.productosParseados[i].id === id){
          return this.productosParseados[i];
        }
    }
  }

  removeProduct(id:number) {
    const index = this.productosParseados.findIndex(producto => producto.id === id);
    if (index !== -1) {
      this.productosParseados.splice(index,1);
      console.log(`Producto con id ${id} eliminado correctamente.`);
    } else {
      console.log(`No se encontró ningún producto con id ${id}.`);
    }
  }

  getSortedByPrice(order: string): Product[] {
    if (order === 'asc') {
      return this.productosParseados.slice().sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      return this.productosParseados.slice().sort((a, b) => b.price - a.price);
    } else {
      console.log('Orden no válida. Utiliza "asc" o "desc".');
      return [];
    }
 }
}

export { ListaDeProductos, Product };
