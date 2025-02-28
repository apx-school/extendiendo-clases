import { error } from "console";
import * as fs from "fs";
import orderBy from 'lodash/orderBy';
//importamos el metodo orderBy de la libreria lodash

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
// Inicializa un array vacío para almacenar productos de la clase Product.
// Esto permite cargar datos desde el archivo JSON y trabajar con ellos en el método addProduct.
  constructor(name: string) {
    // Llamada al constructor de la superclase: ListaDeCosas
    
    super(name);

    // Lógica adicional para leer products.json y agregar productos usando addProduct

    // Lee el archivo products.json y agrega los productos al array usando addProduct.
    const data = fs.readFileSync(__dirname + "/products.json").toString();
    const productosDesdeJson = JSON.parse(data);
    

    // Ejemplo de cómo se puede invocar addProduct para agregar un producto
    // this.addProduct(new Product(/* parámetros del producto */));

    // Agrega cada producto desde el JSON al array.
    productosDesdeJson.forEach(producto => {
      this.addProduct(producto);
    }); 
    
  }
  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product {
    // Implementación del método getProduct
    const cosas = this.getCosas()
    return cosas.find(c => c.id === id);
  }

  removeProduct(id: number): Product {
    // Implementación del método removeProduct

    //1. buscamos por el id del producto si coincide con el id del argumento, y si es asi, guardamos el indice de este producto a remover, esto gracias a findIndex que devuelve el indice que cumple con la condición
    const productoRemovido = this.cosas.findIndex(product => product.id === id)

    //2. verificamos si el productoRemovido no devolvio -1
    //esto significa que el findIndex que es mi iterador sobre el indice del array, no encontro ningun objeto con esa coincidencia de id
    if(productoRemovido !== -1){


      //3. guardamos el producto a remover por si se quiere utilizar mas adelante para agregarlo nuevamente
      //o incluso llevar un registro de que se fue eliminando
      const productoEliminado = this.cosas[productoRemovido];

      //4. sacamos ese producto del array
      this.cosas.splice(productoRemovido, 1);


      //5. retornamos el productoEliminado
      return productoEliminado;
      
      //6. se arroja un error en caso de no encontrar ese producto a travez del id y por ende no se a podido remover
    } else
    throw new Error(`El producto con id ${id} no fue encontrado y no se puede remover.`)
    
    
  }

  getSortedByPrice(order: "desc" | "asc" ): void{
    // Implementación del método getSortedByPrice

    //1. creamos un if el cual tiene la condicion que el argumento a pasar coincida con el string "desc" en este caso
    if(order === "desc"){

      //2. si se cumple se retorna el array ordenado de mayor a menor enfocado en el precio que es el argumento que le pasamos
      // a la funcion orderBy, ya que esta te pide primero la collection, y luego 2 argumentos, uno que sera esa propiedad
      //referencia a ordenar y luego si se quiere ordenar descendente o ascendente
      return orderBy(this.cosas, ["price"], [order]);

      //3. aca un else if que se verificaria esto, en caso de no cumplirse la condicion anterior
      //este tiene como condicion que ahora mi argumento sea igual a "asc"
    } else if (order === "asc"){

      //4. si se cumple, se retorna el array pero ahora ordenado de menor a mayor enfocado tambien en el precio como se menciona antes
      return orderBy(this.cosas, ["price"], [order]);

      //5. por ultimo si no se cumple nada de esto cae en este else, el cual lanza un mensaje de error que dice que
      //el argumento que le pasamos no es valido, y que se utilice o asc o desc como argumento
    } else 
    throw new Error(`El orden ${order} no es valido, utiliza "asc" o "desc" como argumento`)
  }
}


export { ListaDeProductos, Product };


