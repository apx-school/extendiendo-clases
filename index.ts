import * as fs from "fs";
import * as remove from "lodash/remove";
import * as orderBy from "lodash/orderBy";

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
    //Lee el archivo products.JSON y lo convierte a texto
    const datosRecibidos = fs
      .readFileSync(__dirname + "/products.json")
      .toString();
    //Transformo los datos recibidos en formato string a objetos.
    const datosParseados = JSON.parse(datosRecibidos);
    //Itero el array creado y guardo el valor (en este caso un objeto) de cada una de las posiciones del array
    //en "ListaDeCosas" mediante el metodo addProduct
    datosParseados.forEach((p) => {
      this.addProduct(p);
    });
  }
  //Este metodo recibe como parametro una instancia de Product
  //y utiliza el metodo .add de la clase padre (ListaDeCosas) para guardar en la misma los productos.
  addProduct(producto: Product) {
    this.add(producto);
  }

  getProduct(id: number) {
    const arrayDeCosas = this.getCosas();
    const encontrado = arrayDeCosas.find((item) => {
      return item.id == id;
    });
    return encontrado;
  }

  removeProduct(id: number) {
    const arrayDeCosas = this.getCosas();
    const arrayConProductoRemovido = remove(
      arrayDeCosas,
      (producto) => producto.id == id
    );
  }

  getSortedByPrice(order: "asc" | "desc") {
    const arrayDeCosas = this.getCosas();
    return orderBy(arrayDeCosas, ["price"], [order]);
  }
}

export { ListaDeProductos, Product };
