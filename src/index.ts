import productJson from './products.json';
class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
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
    
     if(productJson.length === 0){
      throw new Error(`No hay productos`);
    }

    this.cosas = productJson;

    this.addProduct(new Product("Coca",850,9));
  }

  addProduct(nuevaCosa):void {
     
    if (!this.cosas.find((cosa) => cosa.id === nuevaCosa.id)) {
      this.cosas.push(nuevaCosa);
    }
  }

  getProduct(id:number):Product{
    return this.cosas.find((cosa:Product) => cosa.id === id);
  }

  removeProduct(id:number):Product{
    const index = this.cosas.findIndex((cosa) => {
      return cosa.id === id;
    })
    
    if(index !== -1) {
       return this.cosas.splice(index,1)[0]
    }
   return  undefined;
    

    
  }

  getSortedByPrice(orderBy:string):Product[]{
    let ordenamiento:Product[] = [...this.cosas];
    if(orderBy.toLowerCase() === "desc"){
      ordenamiento.sort((a,b)=> b.price - a.price);
    }
    else if(orderBy.toLowerCase() === "asc"){
      ordenamiento.sort((a,b) => a.price - b.price);
    }
   
     return ordenamiento
  }
 
}

export { ListaDeProductos, Product };
