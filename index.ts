import products from './products.json';

class Product {
  name: string;
  price: number;
  id: number;

  constructor(name: string, price: number, id: number) {
    this.name = name; // Inicializamos la propiedad name
    this.price = price;
    this.id = id;
  }
}

class ListaDeCosas {
  name: string;
  cosas: Product[] = []; // Cambiamos a Product[]

  constructor(name: string) {
    this.name = name;
  }

  add(nuevaCosa: Product) { // Especificamos el tipo
    this.cosas.push(nuevaCosa);
  }

  getCosas() {
    return this.cosas;
  }
}

class ListaDeProductos extends ListaDeCosas {
  productos: Product[] = products; // Inicializamos la propiedad productos

  constructor(name: string) {
    super(name); // Llama al constructor de la clase padre
    this.cosas = this.productos; // Inicializa cosas con los productos cargados
  }

  // Método para agregar un producto
  // Método para agregar un producto
addProduct(product: Product): void {
  // Solo agrega si no existe ya en productos
  let exists = false; // Variable para verificar si el producto ya existe
  for (const p of this.productos) {
    if (p.id === product.id) {
      exists = true; // Si encontramos un producto con el mismo ID, lo marcamos como existente
      break; // Salimos del bucle
    }
  }

  if (!exists) {
    this.productos.push(product); // Usamos this.productos
    this.add(product); // Llamamos al método add de la clase padre
  }
}


  // Método para obtener un producto por ID
  getProduct(id: number): Product | undefined {
    return this.productos.find(product => product.id === id);
  }

  // Método para eliminar un producto por ID
  // Método para eliminar un producto por ID
removeProduct(id: number): Product | undefined {
  for (let i = 0; i < this.productos.length; i++) {
    if (this.productos[i].id === id) {
      const removedProduct = this.productos[i]; // Guardamos el producto a eliminar
      this.productos.splice(i, 1); // Elimina el producto de la lista
      // Elimina de cosas también
      this.cosas = this.cosas.filter(product => product.id !== id);
      return removedProduct; // Devolvemos el producto eliminado
    }
  }
  return undefined; // Si no se encuentra el producto
}


  // Método para obtener productos ordenados por precio
  getSortedByPrice(order: string): void {
    return this.productos.slice().sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }
}

export { ListaDeProductos, Product };
