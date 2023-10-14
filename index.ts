import * as fs from 'fs';
import { orderBy } from 'lodash';

// const myP2 = { price: 33, id: 123, name: 'mi producto' };

class ListaDeCosas {
	name: string;
	cosas: Product[] = [];
	constructor(name: string) {
		// nombre de esta lista
		this.name = name;
	}
	add(nuevaCosa: Product) {
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

type Ordenamiento = 'asc' | 'desc';

class ListaDeProductos extends ListaDeCosas {
	constructor(name: string) {
		super(name);
		this.obtenerProductos().forEach((element: Product) => this.addProduct(element));
	}

	obtenerProductos() {
		const productos = fs.readFileSync('./products.json');
		return JSON.parse(productos.toString());
	}

	addProduct(producto: Product) {
		const productoIgual = this.getCosas().some((p) => p.id === producto.id);
		if (!productoIgual) this.add(producto);
	}

	getProduct(id: number): Product {
		return this.getCosas().find((p) => p.id === id);
	}

	removeProduct(id: number): Product {
		const producto = this.getProduct(id);
		this.cosas = this.getCosas().filter((p) => p !== producto);
		return producto;
	}

	getSortedByPrice(order: Ordenamiento): Product[] {
		return orderBy(this.getCosas(), 'price', order);
	}
}

/* function main() {
	const nuevaListaDeProductos = new ListaDeProductos('cosita');
	const myP = { price: 33, id: 123, name: 'mi producto' };
	// console.log(nuevaListaDeProductos.addProduct(myP));
}
main(); */

export { ListaDeProductos, Product };
