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

class ListaDeProductos extends ListaDeCosas {
  /*
  extender el constructor original para que además de recibir un nombre para la lista, 
  lea el archivo products.json 
  y agregue todos los productos del JSON usando el método addProduct.*/

  constructor(name: string) {
    super(name);

    const jsonString = fs.readFileSync(__dirname + "/products.json").toString();
    const jsonArray = JSON.parse(jsonString);

    jsonArray.forEach((i) => {
      this.addProduct(i);
    });
  }

  /* 
  un método addProduct que reciba una instancia de la clase Product como parámetro 
  y la agregue usando el método add que ya existe en la superclase.
  
  El método debe validar que no exista un producto con el mismo id antes de agregarlo.
   */

  addProduct(producto: Product) {
    this.add(producto);
  }

  /*
  tener un método getProduct(id:number):Product que devuelva el producto con ese id.*/

  getProduct(id: number) {
    return this.cosas.find((i) => i.id == id);
  }

  /*
  tener un método removeProduct(id:number):Product que elimine el producto con ese id.*/

  removeProduct(id: number) {
    return remove(this.cosas, (i) => i.id == id);
  }

  /*
  tener un método getSortedByPrice que reciba un parámetro order:string con solo dos valores posibles: asc o desc.
  */

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], [order]);
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

export { ListaDeProductos, Product };
