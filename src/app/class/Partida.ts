export class Partida {
    /*id:number;
    nombre: string;
    edad: number;
    calificacion: number;
    carrera: string;
    sexo: string;*/
    constructor(
        public game_id: String,
        public category_id: String,
        public user_id: String,
        public score: number,
        public opponent_score: number,
        public opponent_id: String,
        public turn_user_id: String,
        public game_over: number,
        public winner_id: String,
        public createDate: Date,
        public answerDate: Date) {
        }
}
