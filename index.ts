import * as fs from "fs";
import * as pull from "lodash/pull";
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
  addProduct(prod: Product) {
    if (
      this.getCosas().find((i) => {
        return i.id == prod.id;
      })
    ) {
      console.log("no añadido");
    } else {
      this.add(prod);
    }
  }
  constructor(name: string) {
    super(name);
    const prods = fs.readFileSync(__dirname + "/products.json");
    const prodsStrings = prods.toString();
    const productsObj = JSON.parse(prodsStrings);
    productsObj.forEach((p) => {
      this.addProduct(p);
    });
  }
  getProduct(id: number): Product {
    return this.getCosas().find((i) => {
      return i.id == id;
    });
  }
  removeProduct(id: number): Product {
    const todasLasCosas = this.getCosas();
    const cosaABorrar = this.getCosas().find((i) => {
      return i.id == id;
    });
    return pull(todasLasCosas, cosaABorrar);
  }
  getSortedByPrice(order: "asc" | "desc") {
    //poniendo OR defino que valores puede recibir
    //la función, es decir no cualquier string, sino que o "asc" o "desc", nada más
    //también podría decirle order: string | number
    return orderBy(this.cosas, ["price"], [order]);
    //orderBy recibe 3 parámetros, la lista, la key por la que quiero ordenar, y si es
    //ascendente o descendente
  }
}

export { ListaDeProductos, Product };
