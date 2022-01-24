import * as fs from 'fs'; // Nos permite traer la data actualizada del archivo con los ultimos cambios que hayamos hecho
import * as orderBy from 'lodash/orderBy';

class ListaDeCosas {
	name: string;
	cosas: any[] = [];
	constructor(name: string) {
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

class ListaDeProductos extends ListaDeCosas {
	constructor(name: string) {
		super(name);
		const datosDeProductos = fs.readFileSync(__dirname + '/products.json'); // Yo le había puesto directamente /products.json (es lo mismo)
		const datosParseados = JSON.parse(datosDeProductos.toString());
		datosParseados.forEach((dato: Product) => this.addProduct(dato));
	}

	addProduct(instancia: Product) {
		const productos = this.cosas;
		const idDeProductos = productos.find((prod) => prod.id === instancia.id);
		if (!idDeProductos) {
			this.add(instancia); // Es lo mismo que this.cosas.push(instancia)
		} else {
			throw 'Hay más de un producto con un mismo Id';
		}
		// this.add(instancia); // Esto solo si no se quiere ver cuando hay un id repetido
	}

	getProduct(id: number): Product {
		const productos = this.getCosas();
		return productos.find((prod) => prod['id'] === id);
	}

	removeProduct(id: number): Product {
		const productos = this.cosas;
		const productoQueSeQuiereRemover = productos.find((prod) => prod['id'] === id);
		for (let i = 0; i < productos.length; i++) {
			const producto = productos[i];
			if (producto === productoQueSeQuiereRemover) {
				this.cosas.splice(i, 1);
			}
		}
		return productoQueSeQuiereRemover;
		// Marce usó loadash ---> remove(this.cosas, () => c.id == id);
	}
	// Marce usó --> order: 'asc' | "desc"
	getSortedByPrice(order: string): Product[] {
		return orderBy(this.cosas, ['price'], [order]);
	}
}

export { ListaDeProductos, Product };
