export class CurrentGame {
    constructor(
        public game_id: number,
        public category_name: string,
        public category_img: string,
        public opponent_name: string,
        public turn: number,
        public user_score: number,
        public opponent_score: number) {
        }
}