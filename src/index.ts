import { readFileSync } from 'fs';

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
  constructor(nombre:string){
    super(nombre)
    // Lógica adicional para leer products.json y agregar productos usando addProduct
    const productsData = readFileSync('./src/products.json', 'utf-8');
    const products = JSON.parse(productsData);

    for (const prod of products) {
      this.addProduct(prod);
    }
  }
    addProduct(product: Product): void {
      // Implementación del método addProduct
      this.add(product);
    }
  
    getProduct(id: number): Product {
      // Implementación del método getProduct
      const productos = this.getCosas()
      const productoEncontrado = productos.find(p => p.id === id);
      return productoEncontrado
    }
    
    removeProduct(id: number): Product | undefined {
      // Implementación del método removeProduct
      const productos = this.getCosas();
      const productoEncontrado = productos.find(p => p.id === id);
    
      if (productoEncontrado !== undefined) {
        const productoEliminado = productos.splice(productos.indexOf(productoEncontrado), 1)[0];
        return productoEliminado;
      }
    
      return undefined;
    }
    
    
    getSortedByPrice(order: string): Product[] | undefined {
      // Implementación del método getSortedByPrice
      const productos = this.getCosas();
    
      if (order === 'asc') {
        return productos.slice().sort((a, b) => a.price - b.price);
      } else if (order === 'desc') {
        return productos.slice().sort((a, b) => b.price - a.price);
      } else {
        console.error("Parámetro no válido para ordenar");
        return undefined;
      }
    }
    
    

    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));
}
export { ListaDeProductos, Product };
