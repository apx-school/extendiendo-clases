import test from "ava";
import { ListaDeProductos } from "./index";
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

test('Testeo que el constructor carga los productos desde products.json', t => {
  // Arrange
  const listaDeProductos = new ListaDeProductos('MiLista');

  // Act (the constructor should load the products)
  const productosCargados = listaDeProductos.getCosas();

  // Assert
  t.not(productosCargados, undefined, 'La lista de productos no debería ser undefined');
  t.true(productosCargados.length > 0, 'La lista de productos debería contener al menos un producto');

  // Optionally, you can check the specific products loaded
  const expectedProducts = [
    {
      id: 1,
      name: 'Producto 1',
      price: 100,
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 200,
    },
    {
      id: 3,
      name: 'Producto 3',
      price: 300,
    },
    {
      id: 4,
      name: 'Producto 4',
      price: 400,
    },
    {
      id: 5,
      name: 'Producto 5',
      price: 500,
    },
  ];

  t.deepEqual(productosCargados, expectedProducts, 'La lista de productos cargados no coincide con la esperada');
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