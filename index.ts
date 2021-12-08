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

		const JSONProductos = fs
			.readFileSync(__dirname + "/products.json")
			.toString();

		const productosParseados = JSON.parse(JSONProductos);
		productosParseados.forEach((prod) => {
			this.addProduct(prod);
		});
	}

	addProduct(producto: Product) {
		this.add(producto);
	}

	getProduct(id: number): Product {
		const cosas = this.getCosas();
		const prodCoincidente = cosas.find((prod) => prod.id == id);
		return prodCoincidente;
	}

	removeProduct(id: number): Product {
		const cosas = this.getCosas();
		const prodARemover = cosas.find((prod) => prod.id == id);
		return pull(cosas, prodARemover);
	}

	getSortedByPrice(order: string): Product[] {
		const cosas = this.getCosas();
		if (order === "asc") {
			const ordenAsc = orderBy(cosas, "price", "asc");
			return ordenAsc;
		} else if (order === "desc") {
			const ordenDesc = orderBy(cosas, "price", "desc");
			return ordenDesc;
		}
	}
}

export { ListaDeProductos, Product };
