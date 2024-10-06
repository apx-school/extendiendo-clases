import orderBy from "lodash/orderBy";

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
  constructor(name: string) {
    super(name);
    const modulo = require("fs");
    const leerModulo = modulo.readFileSync(__dirname + "/products.json").toString();
    const archivoParseado = JSON.parse(leerModulo);

   archivoParseado.forEach(element => {
    this.addProduct(element);     
   });
  }

  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product {
    for(let i=0;i<this.cosas.length;i++){
      if(this.cosas[i].id===id) {
        return this.cosas[i];
      }
    }
  }

  removeProduct(id: number): void {
    const index = this.cosas.findIndex((producto)=>{
      return producto.id === id;
    });
    this.cosas.splice(index,1);
  }

  getSortedByPrice(order: "asc" | "desc") {
    const t = orderBy(this.cosas,["price"],[order]);
    return t;
  }
}


export { ListaDeProductos, Product };
