import * as productsJson from "./products.json";


class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
    for (let i = 0; i < productsJson.length; i++) {
      const element = productsJson[i];
      this.add(element);
    };
    
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
  products: Product[] = [];
  listaDeCosas: [];
  constructor(name:string){
    super(name); 
    for (let i = 0; i < productsJson.length; i++) {
      const element = productsJson[i];
      this.addProduct(element);
    };
  };
  addProduct(productToAdd:Product){
    
    this.products.push(productToAdd);
  
    

    // if(existeElProducto != undefined){
    //   return "Error, el producto ya existe";

    // }else{
      
    // }   
  };
  getProduct(id:number):Product{
    const indexProd = this.products.findIndex((x)=>{
      return x.id == id;
    });
    
    const foundProd = this.products[indexProd];
    return foundProd
  };
}

export { ListaDeProductos, Product };
