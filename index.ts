import * as fs from "fs" // (min. 6) Para importarlo previamente se debe, como marco en la teoria del desafio, ejecutar el comando: npm install --save-dev @types/node . Esto le instala a nuestro proyecto todos los tipos de node.js. El modulo de node.js "fs", para que sea reconocido por TS, requiere ese comando y para poder entender que ese modulo existe.

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
    
    const contenidoDelJson = fs.readFileSync(__dirname + "/products.json").toString()  // Leo el JSON con fs (importado previamente, para lo que debí instalar types/node en el contexto de TS) y luego lo paso a string (de buffer a string).  __dirname : Le indica a node que es esta carpeta donde estoy ahora, es preciso y seguro, luego le concateno a __dirname el archivo que quiero que lea, el cual continua y completa la ruta del __dirname
   
    const coll = JSON.parse(contenidoDelJson); // Lo parseo (de string a obj/coll)
    
    coll.forEach((i) => { // El metodo forEach() simplemnete itera y no crea un array nuevo. Debe hacerse como un arrow function
      this.addProduct(i); // Itero cada una de las posiciones del products.json/const "coll" y se las paso como argumento al metodo addProduct() para que haga lo suyo. Con addProduct() agrego todos los productos que estan en el Json a la propiedad "cosas" de la superclase ListaDeCosas
    })
  }
  
  addProduct (product: Product) {
    return this.add(product); // Puedo usar el metodo add() de la superclase ListaDeCosas, ya que la subclase hereda los métodos y propiedades. Le agregamos el parametro que recibe addProduct (argumento dado en el test) como argumento del parametro del metodo add() de la superclase, para que tal método lo agregue en la propiedad "cosas" de la superclas.
  }
  
  getProduct(id: number): Product {
    const cosas = this.getCosas();  // Guardo en una variable el JSON 
    return cosas.find((i) => {    // Con el metodo find() devuelvo el primer valor truthy; en este caso, la posicion de la coll/JSON que tenga un miembro "id" igual al parametro "id" (argumento recibido en el test, 123)
      return i.id == id;
    })
  }
  
  removeProduct(id:number) {
    const arrayNuevo = remove(this.cosas, (i) => i.id == id); // (MIN. 26) Instalo lodash e importo remove(): Saca el item que se le pase (luego del primer parametro que debe ser un array) y lo devuelve en un array NUEVO (el array nuevo será lo que remueva del original). Altera el array original lo cual puede verse en el console.log y comprarlo con el products.json (le sacó el item que le señale al array original), a diferencia de filter() que no altera el array original. Con la arrow function le indico que itere cada una de las posiciones del array y que saque/remueva la que en su propiedad "id" sea igual a "id". En conclusión, busca dentro del array y remueve que se le indique, creando un nuevo array con lo que sacó y modificando el array original.
    console.log(id, this.cosas, arrayNuevo)
  }

  getSortedByPrice(order: "asc" | "desc"){   // (min. 28) Con esa sintaxis se le define el tipo con más precisión, para que solo pueda recibir strings de ese tipo. Esto esta BUENISIMO para limitar y que sea más seguro. Esta funcion tiene que devolver la coll del JSON ordenada por su propiedad price.
    const guardar = orderBy(this.cosas, ["price"], [order]); // Importo orderBy() : https://lodash.com/docs/4.17.15#orderBy Primero una coll, luego que propiedad debe ordenar, y finalmente bajo que criterio (asc: ascendente o desc: descendente). Devuelve un array nuevo, ordenado segun lo indicado.
    console.log(guardar, "array ordenado");
    return guardar;
  }
}

export { ListaDeProductos, Product };
