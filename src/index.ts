import * as FS from "fs";
import Remover from "lodash/remove";
import OrdenarPor from "lodash/orderBy";
class ListaDeCosas {
  Nombre:string;
  Cosas:any[]=[];
  constructor(pnom:string) {
    this.Nombre=pnom;
  };
  Agregar(pnc:any) {
    this.Cosas.push(pnc);
  };
  ObtenerCosas(){
    return this.Cosas;
  };
};
class Producto {
  NombreP:string;
  PrecioP:number;
  IDP: number;
  constructor(pnp:string,ppp:number,pidp:number) {
    this.NombreP=pnp;
    this.PrecioP=ppp;
    this.IDP=pidp;
  };
};
class ListaDeProductos extends ListaDeCosas {
  constructor(pname:string){
    super(pname);
    const TextoProductoJson=FS.readFileSync(__dirname+"/products.json").toString();
    const ParseadoTPJ=JSON.parse(TextoProductoJson);
    ParseadoTPJ.forEach((i)=>{
      this.AgregarProducto(i);
    });
  };
  AgregarProducto(papro:Producto){
    this.Agregar(papro);
  };
  ObtenerProducto(popid:number):Producto{
    const Cosas = this.ObtenerCosas();
    return Cosas.find((i)=>(i.IDP==popid));
  };
  RemoverProducto(pidrp:number){
    Remover(this.Cosas,(i)=>i.IDP==pidrp);
  };
  ObtenerTiendaPorPrecios(po:"asc"|"desc"){
    return OrdenarPor(this.Cosas,["Precio"],[po]);
  };
};
export {ListaDeProductos,Producto};