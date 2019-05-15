import { HighScore } from "./HighScore";

export class Category{
    /*id:number;
    nombre: string;
    edad: number;
    calificacion: number;
    carrera: string;
    sexo: string;*/
    constructor(
        public id: String,
        public name: string,
        public image: string,
        public highscore: HighScore[]
        ) {
        }
}
