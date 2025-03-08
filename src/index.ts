import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';

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
      const productsPath = path.resolve(__dirname, 'products.json');
      const productsData = fs.readFileSync(productsPath, 'utf8');
      const products = JSON.parse(productsData);
      
      products.forEach((product: any) => {
        this.add(product);
      });
    } catch (error) {
      console.error('Error loading products from JSON:', error);
    }
  }
  
  addProduct(product: Product): void {
    const existingProduct = this.getProduct(product.id);
    if (!existingProduct) {
      this.add(product);
    }
  }
  
  getProduct(id: number): Product | undefined {
    return this.cosas.find((product: Product) => product.id === id);
  }
  
  removeProduct(id: number): Product | undefined {
    const index = this.cosas.findIndex((product: Product) => product.id === id);
    if (index !== -1) {
      const removedProduct = this.cosas[index];
      this.cosas.splice(index, 1);
      return removedProduct;
    }
    return undefined;
  }
  
  getSortedByPrice(order: "asc" | "desc"): Product[] {
    return _.orderBy(this.cosas, ['price'], [order]);
  }
}

export { ListaDeProductos, Product };
