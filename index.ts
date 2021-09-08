import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

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
      const productosEnJson = fs
         .readFileSync(__dirname + "/products.json")
         .toString();
      const pasadoAObjeto = JSON.parse(productosEnJson);
      pasadoAObjeto.forEach((p) => {
         this.addProduct(p);
      });
   }
   addProduct(producto: Product) {
      this.add(producto);
   }
   getProduct(id: number): Product {
      const idEncontrado = this.getCosas();
      return idEncontrado.find((p) => p.id == id);
   }
   removeProduct(id: number) {
      const removeProd = this.getCosas();
      remove(removeProd, (c) => c.id == id);
   }
   getSortedByPrice(order: "asc" | "desc") {
      const price = this.getCosas();
      return orderBy(price, ["price"], [order]);
   }
}

export { ListaDeProductos, Product };
