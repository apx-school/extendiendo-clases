import * as remove from "lodash/remove"
import * as sortedBy from "lodash/orderBy"
import * as fs from "fs"

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
  constructor(name:string) {
    super(name);
    const lista = fs.readFileSync(__dirname + "/products.json").toString();
    const data = JSON.parse(lista);
    data.forEach((p) => {
      this.addProduct(p);
    });
  }

// Adicion del producto a la lista
  addProduct(obj:Product){
    // Busco si la lista existente tiene el ID del producto que quiero ingresar
    // si este existe devolvera verdadero y se salteara la adicion
    // caso contrario, es decir si da false, el mismo entrara al if,
    // añadiendo el producto.
    const buscarID = this.cosas.includes(obj.id);
    if (buscarID == false) { 
      return this.add(obj);
    }
  }

  getProduct(id:number){
    // Retorno el item encontrado
    return this.cosas.find((prod) => prod.id === id);
  }

  removeProduct(id:number){
    // Busco el producto por el ID ingresado para luego eliminarlo
    const producto = this.cosas.find((p) => p.id == id);
    // Mediante remove, de Lodash elimino el elemento
    const newList = remove(this.cosas, producto);
    return newList
  }
  
  getSortedByPrice(order: "asc" | "desc"){
    if (order == "asc") {
      return sortedBy(this.cosas, ["price"], ["asc"]);
    }
    if (order == "desc") {
      return sortedBy(this.cosas, ["price"], ["desc"]);
    }
  }


 

}

export { ListaDeProductos, Product };
