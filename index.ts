import * as fs from "fs";
import * as remove from "lodash/remove"
import * as orderBy from "lodash/orderBy"
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
    const jsonCrudo=fs.readFileSync(__dirname+"/products.json").toString();
    const jsonParseado=JSON.parse(jsonCrudo);
    jsonParseado.forEach((producto) => {
      this.addProduct(producto)
      
    });
  };
  addProduct(nuevoProducto:Product){
    this.add(nuevoProducto);
  }
  getProduct(id:number){
    const listadoDeProductos=this.getCosas()
    return listadoDeProductos.find((cosas)=>cosas.id===id)
  }
  removeProduct(id:number){
    const listadoDeProductos=this.getCosas();
    return remove(listadoDeProductos,(cosas)=>cosas.id===id)
  }

  getSortedByPrice(order:"asc"|"desc"){
    const listadoDeProductos=this.getCosas()
    return orderBy(listadoDeProductos,['price'],[order])
  }

}

export { ListaDeProductos, Product };
