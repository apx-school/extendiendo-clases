import * as fs from 'fs';
import * as path from 'path';

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
    this.loadProductsFromJson();
  }

  addProduct(nuevoProducto: Product) {
    // Validar si ya existe un producto con el mismo id
    const existingProduct = this.cosas.find((p) => p.id === nuevoProducto.id);
    if (existingProduct) {
      console.log(`Error: Producto con ID ${nuevoProducto.id} ya existe.`);
      return;
    }

    this.add(nuevoProducto);
  }

  loadProductsFromJson() {
    try {
      // Get the directory name using __dirname
      const __dirname = path.resolve();

      // Read the content of the products.json file synchronously
      const filePath = path.join(__dirname, "products.json");
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      console.log('Contenido del archivo JSON:', fileContent);

      // Parse the content of the JSON file and add each product
      const productsFromFile: Product[] = JSON.parse(fileContent);
      productsFromFile.forEach(product => this.addProduct(product));
    } catch (error) {
      console.error(`Error al leer o parsear el archivo JSON: ${error.message}`);
    }
  }

  getProduct(id: number): Product | undefined {
    return this.cosas.find((p) => p.id === id);
  }

  removeProduct(id: number): Product | undefined {
    const index = this.cosas.findIndex((p) => p.id === id);
    if (index !== -1) {
      return this.cosas.splice(index, 1)[0];
    }
    return undefined;
  }

  getSortedByPrice(order: 'asc' | 'desc'): Product[] {
    const sortedProducts = [...this.cosas];
    sortedProducts.sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price));
    return sortedProducts;
  }
}

export { ListaDeProductos, Product };