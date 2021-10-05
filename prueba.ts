import * as fs from "fs"
//import * as archivo from "./products.json"

const archivoJson = fs.readFileSync(__dirname + "/products.json").toString()
//const archivoParseado = JSON.parse(archivoJson)

class Prueba{
    cosa:string
    numero:number
    constructor(cosa:string,numero:number){
        this.cosa=cosa;
        this.numero=numero
    }  
    addNumero(){
        return this.numero
    }
}
class nuevaPrueba extends Prueba{
    constructor(cosa:string,numero:number,nuevoNumero){
        super(cosa,numero);


       }
    }

