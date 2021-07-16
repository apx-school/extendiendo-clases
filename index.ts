import * as fs from "fs";
import * as pull from "lodash/pull";
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
		const jsonLeido = fs.readFileSync(__dirname + "/products.json");
		const texto = jsonLeido.toString();
		const lista = JSON.parse(texto);
		const productos = lista.forEach((p) => {
			this.addProduct(p);
		});
	}
	addProduct(product: Product) {
		return this.add(product);
	}
	getProduct(id: number): Product {
		const productoEncontrado = this.getCosas().find((p) => p.id == id);
		return productoEncontrado;
	}
	removeProduct(id: number): Product {
		const productoARemover = this.getProduct(id);
		return pull(this.cosas, productoARemover);
	}
	getSortedByPrice(order: "asc" | "desc") {
		return orderBy(this.cosas, ["price"], [order]);
	}
}

export { ListaDeProductos, Product };
