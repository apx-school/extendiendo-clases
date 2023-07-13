/*Crear y exportar la clase **ListaDeProductos** que extiende la clase **ListaDeCosas**.
- La clase **ListaDeProductos** debe:
  - tener un método addProduct que reciba una instancia de la clase **Product** como 
  parámetro y la agregue usando el método **add** que ya existe en la superclase. El método
   debe validar que no exista un producto con el mismo id antes de agregarlo
  - extender el constructor original para que además de recibir un nombre para 
  la lista, lea el archivo **products.json** y agregue todos los productos del JSON 
  usando el método addProduct
  - tener un método **getProduct(id:number):Product** que devuelva el producto con 
  ese **id**
  - tener un método **removeProduct(id:number):Product** que elimine el producto con 
  ese **id**
  - tener un método **getSortedByPrice** que reciba un parametro **order:string** con solo dos
   valores posibles: "asc" o "desc". (Chequear este link https://mariusschulz.com/blog/string-literal-types-in-typescript#string-literal-types-and-union-types).
    Este método debe devolver toda la lista de productos **Product[]** en 
    orden _ascendente_ o _descendente_ dependiendo del parámetro **order** 
    usando https://lodash.com/docs/4.17.15#orderBy
- Correr los tests localmente ejecutando `npm run test`y crear un Pull Request desde GitHub*/
import * as fs from "fs";
import { join } from "lodash";
import { orderBy } from "lodash";
import { pullAllBy } from "lodash";
import { remove } from "lodash";
// import * as products from "./products.json";

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

    const contenidoDelArchivo = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelArchivo = JSON.parse(contenidoDelArchivo);
    productosDelArchivo.forEach((p) => {
      this.addProduct(p);
    });
  }
  // cosas: any[] = [];
  // constructor(name: string) {
  //   super(name);
  // }
  addProduct(product: Product) {
    this.add(product);
  }
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((cosa) => cosa.id == id);
  }
  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id == id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
  }
}
export { ListaDeProductos, Product };

// const compras = new ListaDeProductos("Eze");
// const unProduct = new Product("lavandina", 800, 10);
// const dosProduct = new Product("detergente", 200, 10);
// const tresProduct = new Product("desodorante", 300, 20);
// const cuatropProduct = new Product("jabon", 400, 50);
// const cincoProduct = new Product("perfume", 500, 4);
// const seisProduct = new Product("limpia pisos", 600, 12);
// const sieteProduct = new Product("yerba", 700, 1);
// const ochoProduct = new Product("azucar", 800, 13);
// compras.addProduct(unProduct);
// compras.addProduct(dosProduct);
// compras.addProduct(tresProduct);
// compras.addProduct(cuatropProduct);
// compras.addProduct(cincoProduct);
// compras.addProduct(seisProduct);
// compras.addProduct(sieteProduct);
// compras.addProduct(ochoProduct);
// compras.removeProduct(10);
// console.log(compras);
// console.log(compras.getSortedByPrice("asc"));
