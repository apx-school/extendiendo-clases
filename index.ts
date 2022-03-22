import { readFileSync } from "fs";
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
      const productsFromJSON = JSON.parse(
         readFileSync("./products.json").toString()
      );
      productsFromJSON.forEach((p) => {
         this.addProduct(p);
      });
   }
   addProduct(product: Product) {
      const productoYaExiste = this.getCosas().includes(product);
      if (!productoYaExiste) this.add(product);
   }
   getProduct(id: number): Product {
      const products = this.getCosas();
      return products.find((p) => p.id === id);
   }
   removeProduct(id: number) {
      const products = this.getCosas();
      const productToRemove = products.find((p) => p.id === id);
      products.forEach((p, i) => {
         if (p.id === productToRemove.id) {
            products.splice(i, 1);
         }
      });
   }
   getSortedByPrice(order: "asc" | "desc") {
      if (order === "asc") {
         return this.getCosas().sort((a, b) => {
            return a.price - b.price;
         });
      } else {
         return this.getCosas().sort((a, b) => {
            return b.price - a.price;
         });
      }
   }
}

// const main = () => {
//    const lista = new ListaDeProductos("Lista de prueba");
//    console.log(lista.getCosas());

//    console.log(JSON.parse(readFileSync("./products.json").toString()));
// };
// main();
export { ListaDeProductos, Product };
