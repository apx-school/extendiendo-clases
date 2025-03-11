import{ readFileSync } from "fs";

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
  constructor(name:string) {
    super(name);

  const data = readFileSync("./products.json","utf-8");
  const products = JSON.parse(data);
  

  products.forEach((producto:Product) =>{
      this.addProduct(producto);
  });
  
  }
  
  //Implementacion del metodo addProduct
  addProduct(producto:Product) : void {

    //verificar sielproducto ya existe 
    const exists = this.cosas.some((cosa)=> cosa.id === producto.id);
  
    if(!exists){
      this.add(producto);//Agregarelproducto si no existe
    } else{
      console.log(`Elproducto con ID ${producto.id} ya existe`);
    }
  } 

  getProduct(id:number):Product{
    return this.cosas.find((producto)=> producto.id ===id);
  }  

  removeProduct(id:number):Product{
    const index = this.cosas.findIndex((producto)=>producto.id === id);
    if(index!==-1){
      return this.cosas.splice(index,1)[0];
    }else{
      console.log(`Elproducto con ID ${id} NO existe`);
    }
  }

  getSortedByPrice(order:string):any[]{
    // Copiar la lista para no modificarla la original 
    const sortedList = [...this.cosas];

    // Ordenar la lista segun precio
    sortedList.sort((a:Product, b:Product) =>{
      if(order === "asc"){
        return a.price - b.price;// Ascendente
      }else{
        return b.price - a.price;// Descendente
      }
      

    });

    return sortedList;
   
  }

}

export { ListaDeProductos, Product };
