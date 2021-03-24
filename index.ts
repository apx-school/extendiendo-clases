import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

const fs = require("fs");
const datos = JSON.parse(fs.readFileSync("products.json"));

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
      super((name = name));
      datos.map((e) => this.addProduct(e));
   }
   addProduct(producto: Product) {
      this.add(producto);
   }
   getProduct(id: number): Product {
      return this.getCosas().find((e) => e.id === id);
   }
   removeProduct(id: number): Product {
      return remove(
         this.getCosas(),
         this.getCosas().find((e) => e.id === id)
      );
   }
   getSortedByPrice(order: "asc" | "desc") {
      var ordenado: Product[] = orderBy(this.getCosas(), "price", order);
      return ordenado;
   }
}

export { ListaDeProductos, Product };
