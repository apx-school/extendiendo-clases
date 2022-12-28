import * as products from "./products.json";
import * as pull from "lodash/pull";
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
  constructor(name: string) {
    super(name);
    products.map((producto) => {
      this.addProduct(producto);
    });
  }
  addProduct(product: Product) {
    const comprueId = this.getCosas().find((productos) => {
      return productos.id == product.id;
    });
    if (comprueId == undefined) {
      this.add(product);
    } else {
      throw new Error("Existen dos o mas productos con mismo Id");
    }
  }
  getProduct(id: number): Product {
    return this.getCosas().find((producto) => {
      return producto.id == id;
    });
  }
  removeProduct(id: number): Product {
    const productoAEliminar = this.getProduct(id);
    return pull(this.getCosas(), productoAEliminar);
  }
  getSortedByPrice(order: string) {
    const things = this.getCosas();
    function asc() {
      things.sort(function (a, b) {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    }
    function desc() {
      things.sort(function (a, b) {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    }

    if (order === "asc") {
      asc();
    } else if (order === "desc") {
      desc();
    } else {
      throw console.error("err getSortedByPrice, try 'asc' or 'desc'");
    }
    return things;
  }
}

function main() {
  const celu = new Product("samsung 10", 59, 6);
  const tele = new Product("TV LGBT", 400, 7);
  const lista = new ListaDeProductos("carrito de compras");
  /*lista.addProduct(celu);
  lista.addProduct(tele);
  console.log(lista);*/
}
main();

export { ListaDeProductos, Product };
