export class CurrentGame {
    constructor(
        public game_id: String,
        public category_id: String,
        public category_name: string,
        public category_img: string,
        public opponent_name: string,
        public turn: String,
        public user_score: number,
        public opponent_score: number) {
        }
}