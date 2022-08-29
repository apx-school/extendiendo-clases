import * as fs from "fs"
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
// Crear y exportar la clase ListaDeProductos que extiende la clase ListaDeCosas. La clase ListaDeProductos debe:

// *extender el constructor original para que además de recibir un nombre para la lista, lea el archivo products.json y agregue todos los productos del JSON usando el método addProduct.


class ListaDeProductos extends ListaDeCosas {
  constructor(name:string ,){
    super(name)
    const productsJson = fs.readFileSync(__dirname +"products.json").toString()
    const jsonParseado = JSON.parse(productsJson)

    jsonParseado.forEach((p) => {
       this.addProduct(p)
    });
    

    }
    // *tener un método addProduct que reciba una instancia de la clase Product como parámetro y la agregue usando el método add que ya existe en la superclase. El método debe validar que no exista un producto con el mismo id antes de agregarlo.
   
  addProduct(product:Product){
    const prodEncontrado = this.cosas.find(x => x.id == product.id)
    if (prodEncontrado != product.id){
      this.add(prodEncontrado)
    }

  }
  // *tener un método getProduct(id:number):Product que devuelva el producto con ese id.
  getProduct(id:number):Product{
   const cosas = this.getCosas() 
   
   return cosas.find((x) => x.id === id )
  }
// *tener un método removeProduct(id:number):Product que elimine el producto con ese id.
  removeProduct(id:number):Product{
    const cosas = this.getCosas()   
    const remov = remove( cosas , (x)=>{
      x.id == id
    })
    return remov
  }
// *tener un método getSortedByPrice que reciba un parámetro order:string con solo dos valores posibles: asc o desc. 

  getSortedByPrice(order:"asc"|"desc" ){
    const cosas = this.getCosas()
    const resultado = orderBy(cosas, ["price"], order)
    return resultado
  };
};




export { ListaDeProductos, Product };
