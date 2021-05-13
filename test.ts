import test from "ava";
import { ListaDeProductos } from "./index";
import * as products from "./products.json";
//import * as orderBy from "lodash/orderBy";
import * as _ from "lodash";

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

test("Testeo el getSortedByPrice", (t) => {
  const lista = new ListaDeProductos("marce");
  t.deepEqual(
    _.orderBy(lista.cosas, "price", "desc"),
    lista.getSortedByPrice("desc")
  );
});