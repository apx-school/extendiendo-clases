import { readFileSync } from 'node:fs';
import * as remove from 'lodash/remove';
import * as reverse from 'lodash/reverse'
const products=readFileSync("products.json")
const productsParseados=JSON.parse(products.toString())

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
    productsParseados.forEach(element => {
      this.addProduct(element)
    });
      
    };
    
  
  addProduct(product:Product){
 this.add(product)

}
getProduct(id:number):Product{
  const productFound=this.cosas.find((p=>p.id===id))
  return productFound
}
removeProduct(id:number):any{
remove(this.cosas, {id: id});
return this.cosas
}
getSortedByPrice(order:"asc"|"desc"){
  let arrayOrdenado:Product[]
  
arrayOrdenado=this.cosas.sort(function (a, b) {
  if (a.price > b.price) {
    return 1;
  }
  if (a.price < b.price) {
    return -1;
  }
  // a must be equal to b
  return 0;
});if(order=="asc"){
  return arrayOrdenado
}else{
  return reverse(arrayOrdenado)
}


}


}
// function main(){
//   const lista =new ListaDeProductos("cosas")
//    console.log(lista)
//   lista.addProduct({name:"mazo",price:200, id:8})
//   console.log(lista)
  
// }
// main()


export { ListaDeProductos, Product };
