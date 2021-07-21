import * as products from "./products.json";

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

class ListaDeProductos extends ListaDeCosas{
  addProduct(newProduct: Product){
    if (this.cosas.some(c => c.id == newProduct.id) == false) {
      this.add(newProduct);
    }
  }
  constructor(name: string){
    super(name);
    products.forEach(p => this.addProduct(p));
  }
  getProduct(id: number): Product {
    return this.cosas.find(c => c.id == id);
  }
  removeProduct(id: number) {
    this.cosas.splice(this.cosas.indexOf(this.cosas.find(c => c.id == id)), 1);
  }
  getSortedByPrice(order: "asc" | "desc"){
    if (order = "asc") {
      return this.cosas.sort((a, b) => {
        if (a.id > b.id) {
          return -1;
        }
        if (a.id < b.id) {
          return 1;
        }
        return 0;
      });
    };
    if (order = "desc") {
      return this.cosas.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
    }
  }
}

export { ListaDeProductos, Product };

