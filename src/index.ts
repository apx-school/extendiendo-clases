import fs from "fs";
import { remove, orderBy} from "lodash";



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
    super(name)
    
    const dataJson = fs.readFileSync(__dirname + "/products.json").toString()
    const contenidoDataJson = JSON.parse(dataJson)
    contenidoDataJson.forEach(product => {
      this.addProduct(product)
    });
  }
  addProduct(product: Product): void{
    this.add(product);
  }
  getProduct(id: number): Product{
    const cosas = this.getCosas()
    return cosas.find(cosa => cosa.id == id)
  }
  removeProduct(id: number): Product{
    remove(this.cosas,cosa => cosa.id == id);
    return
  }
  getSortedByPrice(order: "asc" | "desc") {
    return orderBy(this.cosas, ["price"],[order])
  }
}

export { ListaDeProductos, Product };



