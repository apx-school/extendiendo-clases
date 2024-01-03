import fs from "fs";
import { orderBy, remove } from "lodash";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];

  constructor(name: string) {
    this.name = name;
  }

  add(nuevaCosa: any) {
    this.cosas.push(nuevaCosa);
  }

  getCosas(): any[] {
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
  constructor(listaName: string) {
    const productsFile = fs.readFileSync(__dirname + "/products.json");
    
    super(listaName);
    
    this.cosas = JSON.parse(productsFile.toString());
  }

  getProduct(idProduct: number): Product | undefined {
    return this.cosas.find((product) => product.id  === idProduct);
  }

  addProduct(product: Product): void {
    const resultSearch =  this.getProduct(product.id);

    if(!resultSearch) this.add(product)
  }

  removeProduct(idProduct: number): void{
    remove(this.getCosas(), (product: Product) => product.id === idProduct);
  }  

  getSortedByPrice(order: "asc" | "desc"): Product[] {
    return orderBy(this.getCosas(), "price", order);
  }

}

export { ListaDeProductos, Product };
