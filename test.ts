import test from "ava";
import { ListaDeProductos, Product } from "./index";
import products from "./products.json";
import { orderBy } from "lodash";


test("Test de prueba", (t) => {
  t.is("hola", "hola");
});

// todos los tests que siguen van a fallar
// apenas te bajes este repo.
// comentalos y empezá a descomentar de a uno
// a medida que vayas avanzando en el objetivo
// de cada test

test("Testeo el constructor", (t) => {
  const lista = new ListaDeProductos("marce");
  t.is(lista.name, "marce");
});

test("Testeo que el constructor cargue el products.json", (t) => {
  const lista = new ListaDeProductos("marce");
  const cosas = lista.getCosas();

  t.deepEqual(cosas, products);
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


