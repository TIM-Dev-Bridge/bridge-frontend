export interface TourDataProtocol {
    tour_name: string,
    max_player: number,
    type: string,
    password: string,
    players: string[],
    time_start: string,//"11/12/2021, 11:18:00 PM"
    status: string,
    board_to_play: number,
    minute_board: number,
    board_per_round: number,
    movement: string,
    scoring: string,
    barometer: boolean,
    createBy: string,
    mode: string // online, local
}

class TourDataObj implements TourDataProtocol {
    tour_name: string;
    max_player: number;
    type: string;
    password: string;
    players: string[];
    time_start: string;
    status: string;
    board_to_play: number;
    minute_board: number;
    board_per_round: number;
    movement: string;
    scoring: string;
    barometer: boolean;
    createBy: string;
    mode: string;
    
    constructor(model: TourDataProtocol) {
        this.tour_name = model.tour_name
        this.max_player = model.max_player;
        this.type = model.type
        this.password = model.password
        this.players = model.players
        this.time_start = model.time_start
        this.status = model.status
        this.board_to_play = model.board_to_play
        this.minute_board = model.minute_board
        this.board_per_round = model.board_per_round
        this.movement = model.movement
        this.scoring = model.scoring
        this.barometer = model.barometer
        this.createBy = model.createBy
        this.mode = model.mode
    }
}

export default TourDataObj;