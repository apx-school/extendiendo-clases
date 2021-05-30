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

  const ProductosEnTexto= fs.readFileSync(__dirname + "/products.json").toString();
  const productosParseados = JSON.parse(ProductosEnTexto); //obj

  productosParseados.forEach(objeto => {
    this.addProduct(objeto) //objeto es justamente un producto. concide con lo q recibe el parametro de addProduct
  });
}

addProduct(product: Product){
//herede el metodo add desde la clase padre lista de cosas

return this.add(product)
}

getProduct(id:number):Product{
const productos = this.getCosas();
const buscoPorId = productos.find((p) => p.id == id);
return buscoPorId;
}

removeProduct(id:number){
const productos = this.getCosas()
const productoSolicitado = productos.find((p)=> p.id == id)
const borrar = productos.splice(productoSolicitado)
return borrar

//remove(this.cosas, (p)=> p.id == id); ------ funcion traida de lodash. Antes del coma es la lista, lo segundo es lo que queremos borrar de la lista.
}



getSortedByPrice(order:  "asc" | "desc"){ // en vez de tener como control un string, queremos un string en particular, alguno de esos dos
return orderBy(this.cosas, ["price"], [order])
//otra funcion importada de lodash, el primer [] indica la propiedad q debe ser ordenada, el otro [] como debe hacerlo, asc o desc


}
}

//var  users = [
 // {  'usuario' :  'fred' ,    'edad' :  48  } ,
 // {  'usuario' :  'barney' ,  'edad' :  34  } ,
 // {  'usuario' :  'fred' ,    'edad' :  40  } ,
//  {  'usuario' :  'barney' ,  'edad' :  36  }
// /];
 
// Ordenar por `usuario` en orden ascendente y por` edad` en orden descendente.
// orderBy (usuarios ,  [ 'usuario' ,  'edad' ] ,  [ 'asc' ,  'desc' ]);

// => objetos para [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]

export { ListaDeProductos, Product };
