export class Follower {
    /*id:number;
    nombre: string;
    edad: number;
    calificacion: number;
    carrera: string;
    sexo: string;*/ 
    constructor(
        public id: number,
        public user_id: number,
        public followers:number[]) {
        }
}