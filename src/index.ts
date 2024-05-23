import { log } from "console";
import * as fs from "fs"; // importar fyle system
import { dirname } from "path"; // apx/repos-remotos/extendiendo-clases

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

  setCosas(cosas) {
    // sobrescribe la lista original = cosas
    this.cosas = cosas;
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
    super(name); // Llamada al constructor de la superclase

    const contenidoArchivo = fs
      .readFileSync(__dirname + "/products.json")
      .toString(); // leer archivo json y transforma en texto
    const productosDelArchivo = JSON.parse(contenidoArchivo); // transforma el texto  en array de objetos Producto

    this.cosas = productosDelArchivo; // test => t.deepEqual(cosas, products); (25)
  }

  addProduct(product: Product): void {
    // Implementación del método addProduct
    this.add(product);
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    const productos = this.getCosas();

    const producto: Product = productos.find((p: Product) => p.id === id);

    return producto;
  }

  removeProduct(id: number): Product {
    //   // Implementación del método removeProduct
    const productos = this.getCosas(); // traigo la lista de cosas = productos

    const productoEliminado = productos.find((p: Product) => p.id === id);
    //busco producto x id 

    if (productoEliminado) {
      this.setCosas(productos.filter((p: Product) => p.id !== id));
      return productoEliminado;
    }

    return undefined;
  }

  getSortedByPrice(order: string): Product[] {
    // Implementación del método getSortedByPrice

  const productos = this.getCosas(); // traigo la lista de cosas = productos

   if (order === "asc") {
     return productos
       .slice()
       .sort((a: Product, b: Product) => a.price - b.price);
   } else if (order === "desc") {
     return productos
       .slice()
       .sort((a: Product, b: Product) => b.price - a.price);
   } else {
     console.error('Orden no válida. Por favor, use "asc" o "desc".');
     return [];
   }


  }
}

export { ListaDeProductos, Product };
