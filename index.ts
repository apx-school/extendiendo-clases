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
  

  constructor(name: string){
    super(name);
    const contenido = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
      const productosDelArchieve = JSON.parse(contenido);
      productosDelArchieve.forEach(p=>{
        this.addProduct(p)
      })
  }
  addProduct(product: Product){
    //busco en cosas porque ListaDeCosas es la superClase de ListaDeProductos;
    const idProd = this.cosas.find(p=>{
      p.id === product.id
    })
    if(!idProd){
      return this.add(product)
    }
  }

  getProduct(id:number){
    const cosasS = this.getCosas();
    return cosasS.find(p=>p.id === id)
  }
  
  removeProduct(id:number){
    const removeProd = remove(this.cosas, (p)=>p.id == id)
    
    return removeProd


    // const remover = this.cosas.find((p)=>{
    //   const elem = p.id === id;
    //   return elem
    // });
    // const cosasss = this.cosas;
    // const elIndex = cosasss.indexOf(remover);
    // const elimina2 = cosasss.splice(elIndex, 1)

    // // console.log('REMOVER',cosasss.indexOf(remover));
    // // console.log(remover);
    // // console.log(['FINALLIZACION'],elimina2);
    // // console.log(['COSAS FINALIZADAS'],cosasss)
    // return cosasss 
  }

  getSortedByPrice(order:string){
    const orderS = orderBy(this.cosas, (p)=>p.price, order);
    return orderS
  }
}

export { ListaDeProductos, Product };


function main(){
  const prod1 = new Product('pucho', 150, 1);
  const prod2 = new Product('pucho', 250, 2);
  const prod3 = new Product('pucho', 350, 3);
  const prod4 = new Product('pucho', 450, 4);
  const prod11 = new Product('pucho', 150, 1);
  const prod22 = new Product('pucho', 250, 2);
  const prod33 = new Product('pucho', 350, 3);
  const prod44 = new Product('pucho', 450, 4);

  const listaCosas = new ListaDeCosas('lista1');
  // [prod1, prod2, prod3, prod4]
  listaCosas.add(prod1)
  listaCosas.add(prod2)
  listaCosas.add(prod3)

  const listaDeProd = new ListaDeProductos('lista2')
  console.log(listaCosas)
  console.log(listaDeProd);
  console.log(listaDeProd.getProduct(1))
  console.log(listaDeProd.removeProduct(1));
  const prodNuevo = {name: 'prod', price: 50, id: 8}
  listaDeProd.addProduct(prodNuevo);
  console.log(listaDeProd)
  listaDeProd.removeProduct(prodNuevo.id); //id: 8
  listaDeProd.removeProduct(4);
  console.log(listaDeProd.getSortedByPrice('desc'))
  console.log(listaDeProd.getSortedByPrice('asc'))
  console.log(['LISTA FINAL'], listaDeProd)

}

main()

// constructor(name: string){
//   super(name)
//   const contenidoDelArchivo = fs
//     .readFileSync(__dirname + "/products.json")
//     .toString();
//   const productosDelArchivo = JSON.parse(contenidoDelArchivo);
//   productosDelArchivo.forEach(p=>{
//     this.addProduct(p);
//   })
// }
// addProduct(product: Product){
//   this.add(product)
// }
// getProduct(id: number){
//   const cosas = this.getCosas();
//   return cosas.find((c)=> c.id == id)
// }