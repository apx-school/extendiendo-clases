import *as path from "path";
import * as fs from "fs";


class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    this.cosas = [];
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
    super(name)

   const filePath = path.join(__dirname, "products.json"); 
    const data = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(data);

    products.forEach((lista: any) => {
      this.addProduct({name: lista.name, price:lista.price, id:lista.id});
    });

  };

   addProduct(product: Product){
    const existProduct = this.cosas.some((ProductExistente: Product) => ProductExistente.id === product.id);
  if (!existProduct){
    this.cosas.push(product);
    return true;
    }
    return false;

  }
  getProduct(id: number){
    return  this.cosas.find((producto: Product)=> producto.id === id);
    
  }

  removeProduct(id: number){
    const deleteProduct = this.cosas.findIndex((indice:Product) => indice.id === id);
    if (deleteProduct !== -1) {
      this.cosas.splice(deleteProduct, 1);
      return true;
    }
    return false;
    
  }
  getSortedByPrice(order: "asc" | "desc"): Product[] {
    const comparar = (a: Product, b: Product) => order === "asc" ? a.price - b.price : b.price - a.price;
      
  return [...this.cosas].sort(comparar);
};

}

export { ListaDeProductos, Product };
