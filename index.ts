import { readFileSync } from 'fs';
import * as _ from "lodash";

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

  constructor(name:string){
    super(name);
    const listaDeProd = readFileSync("./products.json");
    const productosAString = listaDeProd.toString();
    const parseados = JSON.parse(productosAString);
    this.cosas = parseados;
    parseados.forEach(prod => {
      this.addProduct(prod);
    });
  };
  
  addProduct(producto: Product){
    const verificacionDeId = this.cosas.find(cosa => cosa.id === producto.id);
    if(!verificacionDeId){
      this.add(producto);
    }
  };

  //tener un método getProduct(id:number):Product
  //que devuelva el producto con ese id. 

  getProduct(id:number):Product {
    const buscandoId = this.cosas.find(prod => prod.id == id);
    return buscandoId;
  };

  //removeProduct(id:number):Product
  //que elimine el producto con ese id.

  removeProduct (id:number){
    const arrayFiltrado = this.cosas.filter(prod => prod.id !== id);
    this.cosas = arrayFiltrado;
  }

  //tener un método getSortedByPrice que reciba un parámetro order:string
  //con solo dos valores posibles: asc o desc

  getSortedByPrice(order: "asc" | "desc"){
    const prodOrdenados = _.orderBy(this.cosas, ["price"], [order]);
    return prodOrdenados;
  }

}

export { ListaDeProductos, Product };
