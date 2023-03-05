import * as products from "./products.json";
import * as _orderBy from "lodash/orderBy";
import * as _size from "lodash/size";
import * as _forEach from "lodash/forEach";
import * as _finder from "lodash/find";
import * as _remover from "lodash/remove";

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
  constructor(nombreLista: string) {
    super(nombreLista);
    //Recorra el json y manda uno por uno a addProduct los productos
    const productos: Product[] = products;
    _forEach(productos, (i) => {
      this.addProduct(i);
    });
  }
  addProduct(prod: Product) {
    //si no existe en cosas agregarlo
    if (_size(this.cosas) > 0) {
      const encontrado = _finder(this.cosas, function (i) {
        return i.id === prod.id;
      });
      if (!encontrado) {
        this.add(prod);
      } else {
        console.log("No se insertó el producto", prod.name, ". El id", prod.id, "ya existe");
      }
    } else {
      this.add(prod);
    }
  }
  getProduct(id: number): Product {
    if (_size(this.cosas) > 0) {
      const encontrado = _finder(this.cosas, function (i) {
        return i.id === id;
      });
      if (encontrado) {
        return encontrado;
      } else {
        console.log("Id " + id + " no encontrado en getProduct");
      }
    } else {
      console.log("Lista sin productos");
    }
  }
  removeProduct(id: number): Product[] {
    if (_size(this.cosas) > 0) {
      const encontrado = _remover(this.cosas, function (i) {
        return i.id === id;
      });
      if (encontrado) {
        return this.cosas;
      } else {
        console.log("Id " + id + " no encontrado en removeProduct");
      }
    } else {
      console.log("Lista sin productos");
    }
  }

  getSortedByPrice(order: string): Product[] {
    if (_size(this.cosas) > 0) {
      if (order !== "asc" && order !== "desc") {
        console.log("Ordenamiento inválido, ingrese 'asc' o 'desc'");
      } else {
        if (order === "asc") {
          const ordenados: Product[] = _orderBy(this.cosas, "price", order);
          return ordenados;
        }
        if (order === "desc") {
          const ordenados: Product[] = _orderBy(this.cosas, "price", order);
          return ordenados;
        }
      }
    }
  }
}

export { ListaDeProductos, Product };
