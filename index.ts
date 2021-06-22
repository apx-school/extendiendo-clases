import * as fs from "fs" // (min. 6 aprox.)

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
    const contenidoDelJson = fs.readFileSync(__dirname + "/products.json").toString()  // __dirname : Le indica a node que es esta carpeta donde estoy ahora. Luego le concateno el archivo que quiero que lea, el cual continua y completa la ruta del __dirname
    const coll = JSON.parse(contenidoDelJson)
    
    coll.forEach((i) => {
      this.addProduct(i); // Agrego todos los productos que estan en el Json a la propiedad cosas de la superclase ListaDeCosas
    })
  }
  
  addProduct (product: Product) {
    return this.add(product); // Puedo usar el metodo add() de la superclase ListaDeCosas
  }
  
  getProduct(id: number): Product {
    const cosas = this.getCosas();
    return cosas.find((i) => {
      return i.id == id;
    })
  }
  
  removeProduct(id:number) {
    const arrayNuevo = remove(this.cosas, (i) => i.id == id); // remove(): Saca el item que se le pase (luego del primer parametro) y lo devuelve en un array nuevo. Altera el array original lo cual puede verse en el console.log y comprarlo con el products.json (le sacó el item que le señale al array original), a diferencia de filter()
    console.log(id, this.cosas, arrayNuevo)
  }

  getSortedByPrice(order: "asc" | "desc"){   // (min. 28) Con esa sintaxis se le define el tipo con más precisión, para que solo pueda recibir strings de ese tipo. Esto esta BUENISIMO para limitar y que sea más seguro.
    const guardar = orderBy(this.cosas, ["price"], [order]);
    console.log(guardar);
    return guardar
  }
}

export { ListaDeProductos, Product };
