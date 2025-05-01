import Test from "ava";
import { ListaDeProductos } from "./index";
import Productos from "./products.json";
import OrdenarPor from "lodash/orderBy";
Test("Test de prueba",(t)=>{
  t.is("hola","hola");
});
Test("Testeo el constructor",(t)=>{
  const Lista = new ListaDeProductos("Pablo");
  t.is(Lista.Nombre,"Pablo");
});
Test("Testeo que el constructor cargue el products.json",(t)=>{
  const Lista = new ListaDeProductos("Pablo");
  const Cosas = Lista.ObtenerCosas();
  t.deepEqual(Cosas,Productos);
});
Test("Testeo el AgregarProducto",(t)=>{
  const Lista = new ListaDeProductos("Pablo");
  const myP={PrecioP:33,IDP:123,NombreP:"mi producto"};
  Lista.AgregarProducto(myP);
  const myP2=Lista.ObtenerProducto(myP.IDP);
  t.deepEqual(myP2,myP);
});
Test("Testeo el removeProduct",(t)=>{
  const lista = new ListaDeProductos("Pablo");
  const myP={PrecioP:33,IDP:123,NombreP:"mi producto"};
  lista.AgregarProducto(myP);
  lista.RemoverProducto(myP.IDP);
  const P=lista.ObtenerProducto(myP.IDP);
  t.falsy(P);
});
Test("Testeo el ObtenerTiendaPorPrecios",(t)=>{
  const lista = new ListaDeProductos("Pablo");
  t.deepEqual(
    OrdenarPor(lista.Cosas,"Precio","desc"),
    lista.ObtenerTiendaPorPrecios("desc")
  );
});