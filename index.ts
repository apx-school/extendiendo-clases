import *as fs from "fs"
import *as remove from "lodash/remove"
import *as orderBy from "lodash/orderBy"

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
export {ListaDeProductos};
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
  //Propiedades.
  constructor (name :string) {
    super (name);
    const productsJson = fs.readFileSync(__dirname + "/products.json").toString();
    const productsJsonParseado = JSON.parse(productsJson);
    productsJsonParseado.forEach((p) => {
      this.add(p);
    });
  }

  //Métodos.
addProduct (producto: Product) {
    this.add(producto);
  } 

getProduct(id:number):Product{
  const cosas = this.getCosas();
  return cosas.find((p) => p.id == id);
}

removeProduct(id:number):Product {
  const arrayNuevo = remove(this.cosas, (c) => c.id == id);
  return arrayNuevo; 
   }

   getSortedByPrice(order:string): Product {
    const sorted = orderBy(this.cosas, ["price"], [order]);
    console.log(sorted);
    return sorted;
   } 
}

