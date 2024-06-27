import * as fs from 'fs';
let ruta: string = __dirname + '/products.json';

class Product {
   name: string;
   price: number;
   id: number;
   constructor(name: string, price: number, id: number) {
     this.name = name;
     this.price = price;
     this.id = id }
}

class ListaDeCosas {
   name: string;
   cosas: any[] = [];
   constructor(name: string) {
     this.name = name }
   add(nuevaCosa: Product) {
     this.cosas.push(nuevaCosa) }
   getCosas() {
     return this.cosas }
}
 
class ListaDeProductos extends ListaDeCosas {
   constructor(name:string) {
     super(name);
     this.cosas =  JSON.parse(fs.readFileSync(ruta, 'utf-8'))  }

   addProduct(product: Product):void {
     let productos: Product[] = JSON.parse(fs.readFileSync(ruta, 'utf-8'));
     let aux: Product;
     let resultado: boolean = false;
     for (aux of productos) {
       if (aux.id == product.id) { resultado = true } }
     if (resultado == false) { 
       productos.push(product);
       let texto: string = JSON.stringify(productos);
       fs.writeFileSync(ruta, texto) } }

   getProduct(id: number) {
     let productos: Product[] = JSON.parse(fs.readFileSync(ruta, 'utf-8'));
     let aux: Product;
     let resultado: boolean = false;
     for (aux of productos) {
       if (aux.id == id) { 
         resultado = true;
         return aux } };
     if (resultado == false) { return null } }

   removeProduct(id: number) {
     let productos: Product[] = JSON.parse(fs.readFileSync(ruta, 'utf-8'));
     let recorte = productos.filter(aux => aux.id != id);
     let texto: string = JSON.stringify(recorte);
     fs.writeFileSync(ruta, texto) }

   getSortedByPrice(order: 'asc' | 'desc') {
     let productos: Product[] = JSON.parse(fs.readFileSync(ruta, 'utf-8'));
     if (order == 'asc') {
       let resultado = productos.sort((a: Product, b: Product) => a.price - b.price);
       return resultado }
     else if (order == 'desc') {
       let resultado = productos.sort((a: Product, b: Product) => b.price - a.price);
       return resultado } }
}

export { ListaDeProductos, Product };