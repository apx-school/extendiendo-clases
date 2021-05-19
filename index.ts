import * as fs from "fs"
import * as indexOf from "lodash/indexOf"
import * as reverse from "lodash/reverse"

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
  name:string
  price:number
  cosas: any[] = [];
  // extender el constructor original para que además de recibir un nombre para la lista, 
  // lea el archivo products.json y agregue todos los productos del JSON usando el método addProduct. 
  constructor(name:string){
    super(name)
    let archivoProductos = fs.readFileSync(__dirname + "/products.json")
    let archivoProducts = JSON.parse(archivoProductos.toString())
    archivoProducts.forEach(element => {
        this.addProduct(element)
    });
  }

  // tener un método addProduct que reciba una instancia de la clase Product 
  // como parámetro y la agregue usando el método add que ya existe en la superclase.
  //  El método debe validar que no exista un producto con el mismo id antes de agregarlo.
  addProduct(producto:Product){
    const existe = this.cosas.find((e)=>{return e.id == producto.id})
     if (existe) {
       console.log("Hay un producto con identico ID")   
     } else {
       this.add(producto)
     }
  }

  // tener un método getProduct(id:number):Product que devuelva el producto con ese id.
  getProduct(id:number) {
    const cosas = this.getCosas()
    return cosas.find((e)=>{
       return e.id == id
    })
  }

  // tener un método removeProduct(id:number):Product que elimine el producto con ese id.
  removeProduct(id:number) {
    const elementoEliminar = this.cosas.find((e)=>{return e.id == id})
    const index = indexOf(this.cosas, elementoEliminar)
    this.cosas.splice(index, 1)
  }

  // tener un método getSortedByPrice que reciba un parámetro order:string con solo dos valores posibles: asc o desc.
  getSortedByPrice (order: "asc" | "desc"){
     const ordenado = this.cosas.sort((a , b) =>{
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    })
    if (order == "asc") {
      return ordenado
    } if (order == "desc") {
      return reverse(ordenado)
    }
  }
}
function main(){
const miLista = new ListaDeProductos("Hernan")
const miProducto = new Product("prd", 500, 2)
miLista.addProduct(miProducto)
}

main()
export { ListaDeProductos, Product };
