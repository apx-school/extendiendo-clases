import * as fs from "fs"
import { json } from "stream/consumers";
import { orderBy } from "lodash";
/// 

/// TRAER JSON A INDEX.TS
const data = fs.readFileSync('./products.json', 'utf-8');
let losProductos  = JSON.parse(data);
////

  ///// METODO PARA ACTUALIZAR JSON CADA VEZ QUE SE HAGA ALGUN CAMBIO
  ////------
  
  
  
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
    id: number;
    name: string;
    price: number;
    
    constructor( id: number , name: string, price: number) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
    
  }
  
  class ListaDeProductos extends ListaDeCosas {
    constructor(name: string) {
      super(name);
      this.cosas = losProductos
    }

    ////

    actualizarJason(){
      const convertirAJason = JSON.stringify(this.cosas,null,2);
      fs.writeFileSync('./products.json',convertirAJason,'utf-8');
      console.log("Productos actualizados correctamente");
  }
  /// 


    addProduct(product: Product): void {
      /// primero tengo que recorrer el json para  y en medio cunado este recorriendo agrego el numero producto verifinado si ya existe el id
      let igualId = false
      this.cosas.forEach(element => {
      if (element.id === product.id) {
        console.log("El producto ya esta agregado")
        igualId = true;
      }
    });
    
    if (igualId === false) {
      this.cosas.push(product)     
      this.actualizarJason()
      console.log("Producto agregado correctamente")  
      
    }
  }
  
    getProduct(id: number): Product | undefined {
    const obtener = this.cosas.find( x => x.id === id)
    if(obtener){
      return obtener;
    } else{
      console.log("Producto no encontrado")
      return undefined
    }
  }
  
  removeProduct(id: number): Product[] {
    
    this.cosas = this.cosas.filter( p => p.id != id);
    this.actualizarJason()
    return this.cosas
    
    
  }
  
  getSortedByPrice(order: string): any[] | undefined {
    const data = fs.readFileSync('./products.json', 'utf-8'); // Leer siempre del archivo
    const productosActualizados = JSON.parse(data);
    
    if (order === 'desc') return orderBy(productosActualizados, "price", "desc");
    if (order === "asc") return orderBy(productosActualizados, "price", "asc");
    return undefined;
}

  }
  

  
  function main(){
    const mochila = new Product(22,"mochila",600);
    const cartuchera =  new Product (23,"cartuchera",900)
    const colegio = new ListaDeProductos ('Colegio')
    colegio.addProduct(mochila)
    colegio.addProduct(cartuchera)

  console.log(colegio.getSortedByPrice("asc"))
 


  

  


}

main ()

export { ListaDeProductos, Product };
