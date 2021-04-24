import * as fs from "fs";
import * as pull from "lodash/pull";
import * as orderBy from "lodash/orderBy";
import * as find from "lodash/find";

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
    //  extender el constructor original para que además de recibir un nombre para la lista, lea el archivo products.json y agregue todos los productos del JSON usando el método addProduct.
    super(name);

    let productosEnJSON = JSON.parse(
      fs.readFileSync("./products.json").toString()
    );
    productosEnJSON.forEach((item) => {
      this.addProduct(item);
    });
  }

  addProduct(product: Product) {
    //tener un método addProduct que reciba una instancia de la clase Product como parámetro y la agregue usando el método add que ya existe en la superclase. El método debe validar que no exista un producto con el mismo id antes de agregarlo.
    if (find(this.cosas, { id: product.id }) != undefined) {
      throw "No será posible agregar este producto ya que ya existe otro con mismo ID";
    }
    this.add(product);
  }

  getProduct(id: number) {
    // tener un método getProduct(id:number):Product que devuelva el producto con ese id.
    return this.cosas.find((i) => {
      return i.id == id;
    });
  }
  removeProduct(id: number): Product {
    // tener un método removeProduct(id:number):Product que elimine el producto con ese id.
    pull(this.cosas, this.getProduct(id));
    return this.getProduct(id);
  }
  getSortedByPrice(order: "asc" | "desc") {
    // tener un método getSortedByPrice que reciba un parámetro order:string con solo dos valores posibles: asc o desc.
    return orderBy(this.cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
