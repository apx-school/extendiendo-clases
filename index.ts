import * as fs from "fs";
import { dirname } from "path";
import { json } from "stream/consumers";
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
// PARA LLER EL ARCHIVO IMPORTO Y USO EL ARCHIVO FS
class ListaDeProductos extends ListaDeCosas {
	constructor(name: string) {
		super(name);
		const contenidoDelArchivo = fs
			.readFileSync(__dirname + "/product.json")
			.toString();
		const productosArchivo = JSON.parse(contenidoDelArchivo);
		productosArchivo.foreach((p) => {
			this.addProduct(p);
		});
	}
	addProduct(id: Product) {
		this.add(id);
	}
	getProduct(id: number): Product {
		const cosas = this.getCosas();
		return cosas.find((a) => {
			a.id == id;
		});
	}
	// EN ESTOS DOS ULTIMOS CASOS S EBUSCO DIRECTAMENTE EN lodash LA FUNCION QUE ELEIMINA REMOVE Y QUE ORDENA orderBy y LISTO
	removeProduct(id: number): Product {
		const arraynuevo = remove(this.cosas, (a) => a.id == id);
		return arraynuevo;
	}
	getSortedByPrice(order: "asc" | "desc") {
		const ordenado = orderBy(this.cosas["price"], [order]);
		return ordenado;
	}
}

export { ListaDeProductos, Product };
