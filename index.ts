import * as fs from "fs";
import * as _ from "lodash"


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

  const contenidoDelArchivo = fs.readFileSync(__dirname + "/products.json");
  const contenidoToString = contenidoDelArchivo.toString();
  const productosDeArchivos = JSON.parse(contenidoToString);
  
  productosDeArchivos.forEach(p => {
    this.addProduct(p)
  });
}

addProduct(instanciaProduct: Product){
  const product = this.cosas.find(p => p.id == instanciaProduct.id);
  if (!product){this.add(instanciaProduct)}
};

getProduct(id: number): Product {
  const product = this.getCosas();
  return product.find(item => item.id == id)
};

removeProduct(id: number) {
 _.remove(this.cosas, (item) => item.id == id)
};

getSortedByPrice(order:"asc"|"desc"){
  return _.orderBy(this.cosas, ["price"],[order])
}
}

export { ListaDeProductos, Product };
