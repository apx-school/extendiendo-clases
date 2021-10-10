import * as fs from "fs";
import * as _ from "lodash";

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

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string) {
    super(name);
    const archivo = fs.readFileSync(__dirname + "/products.json");
    const archivoATexto = archivo.toString();
    const archivoAObjetos = JSON.parse(archivoATexto);
    // console.log("archivoAObjetos", archivoAObjetos);
    archivoAObjetos.map((d) => {
      return this.addProduct(d);
    });
    // console.log("agrega");
    // this.addProduct(archivoAObjetos);
  }
  addProduct(producto: Product) {
    // if (_.includes(this.cosas, producto.id)) {
    //   this.cosas = this.cosas;
    // } else {
    //   // this.cosas = this.cosas.concat(producto); //funciona pero se tiene que usar metodo add
    //   this.add(producto);
    // }

    const arrayDeIds = this.cosas.map((a) => {
      return a.id;
    });
    if (arrayDeIds.includes(producto.id)) {
      // console.log("incluido");
      this.cosas = this.cosas;
    } else {
      // console.log("no incluido");
      this.cosas = this.cosas.concat(producto); //funciona pero se tiene que usar metodo add
      // this.add(producto);
    }
    // // return this.cosas; // solo para corroborar
  }
  getProduct(id: number): Product {
    const productoEncontrado = _.find(this.cosas, function (o) {
      return o.id == id;
    });
    return productoEncontrado;
  }
  removeProduct(id: number): Product {
    const productoEncontrado = _.find(this.cosas, function (o) {
      return o.id == id;
    });
    // _.pull(this.cosas, productoEncontrado);
    return _.pull(this.cosas, productoEncontrado);
  }
  getSortedByPrice(order: "asc" | "desc") {
    return _.orderBy(this.cosas, "price", order);
  }
}

export { ListaDeProductos, Product };

// function main() {
//   const unoProducto = new Product("tv", 100, 2); // instancia con id repetido del JSON
//   const dosProducto = new Product("dvd", 300, 14);
//   const tresProducto = new Product("vhs", 100, 2);

//   const unaListaDeProductos = new ListaDeProductos("luis");
//   console.log("listado JSON", unaListaDeProductos.cosas);

//   unaListaDeProductos.addProduct(unoProducto);
//   unaListaDeProductos.addProduct(tresProducto);

//   console.log("agregado", unaListaDeProductos.cosas);

//   unaListaDeProductos.addProduct(dosProducto);
//   unaListaDeProductos.addProduct(tresProducto);

//   console.log("listado agregando productos", unaListaDeProductos.cosas);

//   //   console.log("producto encontrado por id", unaListaDeProductos.getProduct(14));

//   //   console.log("producto removido", unaListaDeProductos.removeProduct(5));

//   // console.log(unaListaDeProductos.getSortedByPrice("hola"));
// }

// main();
