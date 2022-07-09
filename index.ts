import * as fs from "fs";
import * as orderBy from "lodash/orderby";

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

		let productos = JSON.parse(
			fs.readFileSync(__dirname + "/products.json").toString()
		);
		productos.forEach((e) => this.addProduct(e));
	}
	addProduct(producto: Product) {
		let idRepetido = this.getCosas().find((e) => e.id == producto.id);
		if (!idRepetido) {
			this.add(producto);
		}
	}
	getProduct(id: number): Product {
		let idFind = this.getCosas().find((e) => e.id == id);
		return idFind;
	}
	removeProduct(id: number): Product[] {
		let idFindIndex = this.getCosas().findIndex((e) => e.id == id);
		return this.cosas.splice(idFindIndex, 1);
	}
	getSortedByPrice(order: "asc" | "desc") {
		return orderBy(this.getCosas(), "price", order);
	}
}

export { ListaDeProductos, Product };
