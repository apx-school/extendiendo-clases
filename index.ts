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
  constructor(name) {
    super(name);
    const readProduc = fs.readFileSync(__dirname + "/products.json").toString();
    const parseado = JSON.parse(readProduc);
    parseado.forEach((p) => {
      this.addProduct(p);
    });
  }
  addProduct(producto: Product) {
    if (
      this.cosas.find((p) => {
        p == producto;
      })
    ) {
      return null;
    } else {
      this.add(producto);
    }
  }

  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((p) => p.id == id);
  }

  removeProduct(id: number) {
    remove(this.cosas, (n) => n.id == id);
  }

  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"], order);
  }
}

export { ListaDeProductos, Product };

//Crear y exportar la clase ListaDeProductos que extiende la clase ListaDeCosas. La clase ListaDeProductos debe:
//tener un método addProduct que reciba una instancia de la clase Product como parámetro y la agregue usando el método add que ya existe en la superclase.
// El método debe validar que no exista un producto con el mismo id antes de agregarlo.
//extender el constructor original para que además de recibir un nombre para la lista, lea el archivo products.json
// y agregue todos los productos del JSON usando el método addProduct.
//tener un método getProduct(id:number):Product que devuelva el producto con ese id.
//tener un método removeProduct(id:number):Product que elimine el producto con ese id.
//tener un método getSortedByPrice que reciba un parámetro order:string con solo dos valores posibles: asc o desc. (Chequear este link)
//Correr los tests localmente ejecutando npm run testy y crear un pull request desde GitHub
