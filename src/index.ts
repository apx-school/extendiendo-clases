const fs = require("fs");

const productsP = fs.readFileSync(__dirname + "/products.json");

const products = JSON.parse(productsP);

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string, cosas: any[] = []) {
    // nombre de esta lista
    this.cosas = cosas;
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
  constructor(name: string) {
    super(name, products);
  }
  //aca los metodos
  addProduct(product: Product) {
    this.add(product);
  }

  getProduct(id: number): Product | undefined {
    return this.cosas.find((product) => product.id === id);
  }

  removeProduct(id: number): Product {
    // Implementación del método removeProduct
    const productDel = this.cosas.find((product) => product.id !== id);
    if (productDel) {
      this.cosas = this.cosas.filter((product: Product) => product.id !== id);
    }
    return productDel;
  }


  getSortedByPrice(order: string): Product[] {
    // Implementación del método getSortedByPrice
    return this.cosas.sort((a: Product, b:Product) => {
      if(order === 'asc'){
        return a.price - b.price;
      }else if (order === 'desc'){
        return b.price - a.price;
      }
    });
  }
}

export { ListaDeProductos, Product };
