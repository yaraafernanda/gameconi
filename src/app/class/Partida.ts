export class Partida {
    /*id:number;
    nombre: string;
    edad: number;
    calificacion: number;
    carrera: string;
    sexo: string;*/
    constructor(
        public game_id: number,
        public categoria_id: number,
        public user_id: number,
        public score: number,
        public opponent_score: number,
        public opponent_id: number,
        public turn_user_id: number,
        public game_over: number,
        public winner_id: number) {
    }
}