import test from "ava";
import { ListaDeProductos } from "./index";
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

test('Testeo que el constructor cargue el products.json', t => {
  const lista = new ListaDeProductos("mi lista");

  const expectedProducts = [
    { name: "Producto 1", price: 100, id: 1 },
    { name: "Producto 2", price: 200, id: 2 },
    { name: "Producto 3", price: 300, id: 3 },
    { name: "Producto 4", price: 400, id: 4 },
    { name: "Producto 5", price: 500, id: 5 },
  ];

  const actualProducts = lista.getCosas().map(product => ({
    name: product.name,
    price: product.price,
    id: product.id
  }));

  t.deepEqual(actualProducts, expectedProducts);
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
