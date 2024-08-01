import * as fs from 'fs';

class ListaDeCosas {
   name: string;
   cosas: any[] = [];
   constructor(name: string, cosas: any[] = []) {
      // nombre de esta lista
      this.name = name;
      this.cosas = cosas;
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
      // Llamada al constructor de la superclase: LisaDeCosas
      super(name);

      // Lógica adicional para leer products.json y agregar productos usando addProduct
      // Ejemplo de cómo se puede invocar addProduct para agregar un producto
      // this.addProduct(new Product(/* parámetros del producto */));
      const fileContent = fs
         .readFileSync(__dirname + '/products.json')
         .toString();
      const products = JSON.parse(fileContent);
      products.forEach((product) => {
         this.addProduct(product);
      });
   }

   addProduct(product: Product): void {
      const existProduct = this.cosas.some((p) => p.id === product.id);
      if (!existProduct) {
         this.cosas.push(product);
      }
   }

   getProduct(id: number): Product {
      return this.cosas.find((p) => p.id === id);
   }

   removeProduct(id: number): Product {
      const product = this.getProduct(id);
      this.cosas = this.cosas.filter((p) => p.id !== id);
      return product;
   }

   getSortedByPrice(order: 'asc' | 'desc'): Product[] {
      return this.cosas.sort((a, b) => {
         if (order === 'asc') {
            return a.price - b.price;
         }
         return b.price - a.price;
      });
   }
}

export { ListaDeProductos, Product };
