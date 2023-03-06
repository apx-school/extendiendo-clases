import * as remove from "./node_modules/lodash/remove"
import * as orderBy from "./node_modules/lodash/orderBy"
let personas:string[] = ["Thiago","Samay","Cande","Franco","Mario"]
let nuevoArray = remove(personas, (nombre) => {
    return nombre === "Franco";
})

const removeJugador = (collection:object[], id:number):object[] => {
    const jugadorEliminado = remove(collection, (jugador) => {
        return jugador.id == id
    })
    return jugadorEliminado
}
type Order = "asc" | "desc"
class Jugador {
    id:number;
    nombre:string;
    campeon:string;
    liga:number
    constructor(id:number, nombre:string, campeon:string, liga:number) {
        this.id = id
        this.nombre = nombre
        this.campeon = campeon
        this.liga = liga
    }
}

const jugadores:Jugador[] = [new Jugador(1, "Thiago", "Sylas", 6),new Jugador(2, "Franco", "Zac", 4),new Jugador(3, "Leonel", "K'Sante", 5),new Jugador(4, "Lauren", "Xerath", 2),new Jugador(5, "tino", "Fiddlesticks", 3)]
console.log(jugadores);
// const ordenarPorLiga = (jugadores:Jugador[], orden:Order):Jugador[] => {
//     const jugadoresOrdenados = [...jugadores]
//     if(orden == "asc") {
//         jugadoresOrdenados.sort((a,b) => a.liga - b.liga)
//     } else if(orden == "desc") {
//         jugadoresOrdenados.sort((a,b) => b.liga - a.liga)
//     } else {
//         throw new Error("Párametro inválido. Solo 'asc' o 'desc' permitidos")
//     }
//     return jugadoresOrdenados
// }
const ordenarPorLiga = (jugadores:Jugador[], orden:Order):Jugador[] => {
    const jugadoresOrdenados = orderBy(jugadores, ["id"], [orden])
    return jugadoresOrdenados
}
// const ordenados = ordenarPorLiga(jugadores, "asc")
console.log("Jugadores de peor a mejor",ordenarPorLiga(jugadores, "asc"));
console.log("Jugadores de mejor a peor",ordenarPorLiga(jugadores, "desc"));
