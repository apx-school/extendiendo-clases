import * as fs from "fs";
import * as encontrar from "lodash/find";
import * as quitar from "lodash/pullAllBy";
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

    const contenidoDelArchivo = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    const productosDelArchivo = JSON.parse(contenidoDelArchivo);

    productosDelArchivo.forEach((item) => {
      this.addProduct(item);
    });
  }

  addProduct(product: Product) {
    this.add(product);
  }

  getProduct(id: number): Product {
    //retorna el objeto cuya id es igual a la que se paso por parametro
    //tengo que buscar en todas las cosas por eso gerCosas asi me trae
    //la coleccion completa, si solo pongo this, voy a estar hablando de
    //un solo producto
    const cosas = this.getCosas();
    //return cosas.find((cosa) => cosa.id == id);
    return encontrar(cosas, { id: id });
  }

  removeProduct(id: number): ListaDeProductos {
    //el pullAllBy me quita todos los cosas que tiene el id:id en la
    // propiedad id
    const cosas = this.getCosas();
    return quitar(cosas, [{ id: id }], "id");
  }

  getSortedByPrice(order: "asc" | "desc") {
    //devuelve los productos ordenado por precio, segun el orden asc o desc
    const cosas = this.getCosas();
    return orderBy(cosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
