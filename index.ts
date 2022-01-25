import * as fs from "fs";
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
  constructor(name :string){
    super(name);
    const archivoJson = fs.readFileSync(__dirname + "/products.json").toString();
    const productosDelArchivo = JSON.parse(archivoJson);
    productosDelArchivo.forEach(p => {
        this.addProduct(p);
    });
  }
  addProduct(producto: Product){  
    this.add(producto)
  };
  getProduct(id: number): Product{
    const producto = this.getCosas();
    return producto.find((c)=>(c.id == id));
  };
  removeProduct(id: number){
    _.remove(this.cosas, (papas)=> papas.id == id);
  };
  getSortedByPrice(order: "asc" | "desc"){
      return _.orderBy(this.cosas, ["price"], [order])
   };

}

export { ListaDeProductos, Product };
