/*
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
	constructor(nombre: string) {
		super(nombre);

		const contenidoDelArchivo = fs
			.readFileSync(__dirname + "products.json")
			.toString();
		const archivo = JSON.parse(contenidoDelArchivo);
		archivo.forEach((a) => {
			this.addProduct(a);
		});
	}
	addProduct(producto: Product) {
		this.add(producto);
	}
	getProduct(id: number): Product {
		const cosa = this.cosas;
		return cosa.find((p) => {
			return p.id == id;
		});
	}
	removeProduct(id: number) {
		remove(this.cosas, (a) => {
			return a.id == id;
		});
	}
	getSortedByPrice(order: "asc" | "desc") {
		return orderBy(this.cosas, ["price"], [order]);
	}
}

export { ListaDeProductos, Product };
*/
