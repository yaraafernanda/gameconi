export class User{ 
    /*id:number;
    nombre: string;
    edad: number;
    calificacion: number;
    carrera: string;
    sexo: string;*/
    constructor(
        public id:number, 
        public username: string,
        public email: string,
        public password: string){
        }
}