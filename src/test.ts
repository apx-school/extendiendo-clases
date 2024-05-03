import test from "ava";
import { ListaDeProductos, Product } from "./index";
import products from "./products.json";
import { orderBy } from "lodash";

test("Test de prueba", (t) => {
  t.is("hola", "hola");
});



test("Testeo el constructor", (t) => {
  const lista = new ListaDeProductos("marce");
  t.is(lista.name, "marce");
});

test("Testeo que el constructor cargue el products.json", (t) => {
  const lista = new ListaDeProductos("marce");
  const cosas = lista.getCosas();
  const productos = products.map((product: any) => new Product(product.name, product.price, product.id));
  t.deepEqual(cosas, productos);
});


test("Testeo el addProduct", (t) => {
  const lista = new ListaDeProductos("marce");
  const myP = { price: 33, id: 123, name: "mi producto" };
  lista.addProduct(myP);
  const myP2 = lista.getProduct(myP.id);
  t.deepEqual(myP2, myP);
});

test("Testeo el removeProduct", (t) => {
  const lista = new ListaDeProductos("marce");
  const myP = { price: 33, id: 123, name: "mi producto" };
  lista.addProduct(myP);
  lista.removeProduct(myP.id);
  const p = lista.getProduct(myP.id);
  t.falsy(p);
});

test("Testeo el getSortedByPrice", (t) => {
  const lista = new ListaDeProductos("marce");
  t.deepEqual(
    orderBy(lista.cosas, "price", "desc"),
    lista.getSortedByPrice("desc")
  );
});
