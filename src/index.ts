import path from "path";
import productos from "./products.json"

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    
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
  listaProductos: {}[];

  constructor(name: string, /*producto: Product, listaProductos: Product[]*/) {
    super(name)
    this.cosas = productos //ESTO NO SE QUE ONDA. Lena no me dice nada
  }

  addProduct(product: Product): void {
    
    let productoCoincide = productos.find((element) => {
      return element.id === product.id
    });
    if (productoCoincide === undefined) {
      productos/*this.listaProductos*/.push(product)
    }
  }

  // ESTE METODO ANDABA BIEN, ABAJO UNA COPIA PARA PROBAR OTRA COSA
  //  getProduct(id: number): Product {
  //    let devuelveObjeto;// LISA SUGIERA QUE  A ESTE COSO SE LE ASIGNE EL TIPO Product c parametros vacios
  //    let idCoincide = productos.find((element) => { return element.id === id }); // OJO VER THIS.COSAS EN VEZ DE PRODUCTOS
  //    if (idCoincide !== undefined) { devuelveObjeto = idCoincide }
  //    return devuelveObjeto
  //  }
  
  getProduct(id: number): Product {
    let devuelveObjeto;// LISA SUGIERA QUE  A ESTE COSO SE LE ASIGNE EL TIPO Product c parametros vacios
    this.cosas
    let idCoincide = this.cosas.find((element) => { return element.id === id }); // OJO VER THIS.COSAS EN VEZ DE PRODUCTOS
    if (idCoincide !== undefined) { devuelveObjeto = idCoincide }
    return devuelveObjeto
  }

  removeProduct(id: number): Product {
    let productoAExtraer;
    this.cosas;
   
    let arrayFiltrado;
    productoAExtraer = this.cosas.find((element) => { return element.id == id });
       
    arrayFiltrado = this.cosas.filter((element) => {
      return (element.id !== productoAExtraer.id) 
        })
    this.cosas = arrayFiltrado
      
    return (productoAExtraer)
      
  }
  
 //ESTO DE ABAJO ANDA Y ME PASA TODOS LOS TEST, PERO EL CAMBIE EL RETORNO DE LA FUNCION DE VOID A ANY
  getSortedByPrice(order: string): any [] { 
    return this.cosas.sort((a, b) => b.price - a.price);
  }
 }
export { ListaDeProductos, Product };
