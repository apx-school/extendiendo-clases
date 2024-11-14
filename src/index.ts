import productos from "./products.json"

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
    return this.cosas.map(product => ({
        name: product.name,
        price: product.price,
        id: product.id
    }));
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
    super(name)

    productos.forEach((prod) => {
      this.addProduct (new Product(prod.name, prod.price, prod.id))
    })

  }

  addProduct (object: Product){
    this.add(object);
  }

  getProduct(id: number){
    return this.cosas.find(index => index.id === id);
  }

  removeProduct (id: number){
    const indice = this.cosas.findIndex(index => index.id === id);
    const prodEliminado = this.cosas.splice(indice, 1)
    return this.cosas
  }

  getSortedByPrice (order: string) {
    if (order === "asc"){
      return this.cosas.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      return this.cosas.sort((a, b) => b.price - a.price)
    } else {return "error en la funcion getSortedByPrice"}
  }
}

export { ListaDeProductos, Product };