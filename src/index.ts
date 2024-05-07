import fs from "fs"; //importamos el archivo fs para poder leer los archivos en typescript
import remove from "lodash/remove"; // el metodo remove de la libreria lodash
import orderBy from "lodash/orderBy"; // el metodo orderBy de la libreria lodash

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
		//leemos el archivo json y lo convertimos en un string
		const archivoJson = fs.readFileSync(__dirname + "/products.json").toString();
		// parseamos ese archivo para que se convierta en objeto
		const productsJson = JSON.parse(archivoJson);
		// iteramos esa const con un forEach para agregar al medoto addProduct cada uno de los mismos
		productsJson.forEach((p) => {
			this.addProduct(p);
		});
	}

	addProduct(product: Product) {
		//usamos el metodo add de la clase listaDeCosas
		this.add(product);
	}

	getProduct(id: number) {
		const cosas = this.cosas;
		return cosas.find((c) => c.id == id);
	}

	removeProduct(id: number) {
		//usamos el metodo remove importado de lodash para remover el id ingresado por parametro
		remove(this.cosas, (c) => c.id == id);
	}
	getSortedByPrice(order: "asc" | "desc") {
		//usamos el metodo orderBy de lodash para ordenar un objeto (this.cosas), segun su propiedad (price)
		// segun order, que es el parametro del metodo, unicamente de tipo asc o desc
		return orderBy(this.cosas, ["price"], [order]);
	}
}

export { ListaDeProductos, Product };
