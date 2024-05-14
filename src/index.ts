import productosJson from "./products.json";
import * as fs from "fs";
import {orderBy} from "lodash";
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
  constructor(nombre: string) {
    // Llamada al constructor de la superclase
    super(nombre)
    // Lógica adicional para leer products.json y agregar productos usando addProduct
    const contenidoProducJson = fs.readFileSync(__dirname + "/products.json").toString();
    const productosJson = JSON.parse(contenidoProducJson);
    productosJson.forEach((p) => {
      this.addProduct(p);
    });
  
    
  }

  

  addProduct(product: Product): void {
    // Implementación del método addProduct
    return this.add(product);
    
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    const cosas = this.getCosas();
    return cosas.find(c => c.id === id);
    
  }

  removeProduct(id: number): Product {
    const indice = this.cosas.findIndex(p => p.id === id);
    if(indice !== -1){
      return this.cosas.splice(indice,1)[0];
    }else{
      return null;
    }
  }

  getSortedByPrice(order: "asc"| "desc"){
    return orderBy(this.cosas,["price"],[order]);
  }
}

export { ListaDeProductos, Product,ListaDeCosas };
