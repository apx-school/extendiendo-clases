import * as fs from "fs"
import * as remove from "lodash/remove"
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
    const product = fs.readFileSync(__dirname + "/products.json")
    const toString = product.toString()
    const productoObj = JSON.parse(toString)
    productoObj.forEach(i => {  
      this.addProduct(i)
    })
  };
  addProduct(product: Product) { 
    this.add(product);
  };
  getProduct(id:number):Product {  
    return this.cosas.find(i => i.id == id);
  };
  removeProduct(id: number): Product[] {
    return this.cosas = this.cosas.filter(i => i.id !== id)
  };
  getSortedByPrice(order: "asc" | "desc") {
    if (order == "asc"){return this.cosas.sort((a, b) => {
      if (a.price < b.price) { 
        return 1
      };
      return 0;
    })
    } if (order == "desc") {  
      return this.cosas.sort((a, b) => {  
        if (a.price > b.price) {
          return -1;
        };
        return 0;
      })
    }
    
  }
}

export { ListaDeProductos, Product };
