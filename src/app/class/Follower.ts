export class Follower {
    /*id:number;
    nombre: string;
    edad: number;
    calificacion: number;
    carrera: string;
    sexo: string;*/ 
    constructor(
        public id: String,
        public user_id: String,
        public followers:String[]) {
        }
}