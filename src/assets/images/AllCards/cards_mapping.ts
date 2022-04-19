import club1 from './club_1.png';
import club2 from './club_2.png';
import club3 from './club_3.png';
import club4 from './club_4.png';
import club5 from './club_5.png';
import club6 from './club_6.png';
import club7 from './club_7.png';
import club8 from './club_8.png';
import club9 from './club_9.png';
import club10 from './club_10.png';
import clubj from './club_jack.png';
import clubq from './club_queen.png';
import clubk from './club_king.png';

import diamond1 from './diamond_1.png';
import diamond2 from './diamond_2.png';
import diamond3 from './diamond_3.png';
import diamond4 from './diamond_4.png';
import diamond5 from './diamond_5.png';
import diamond6 from './diamond_6.png';
import diamond7 from './diamond_7.png';
import diamond8 from './diamond_8.png';
import diamond9 from './diamond_9.png';
import diamond10 from './diamond_10.png';
import diamondj from './diamond_jack.png';
import diamondq from './diamond_queen.png';
import diamondk from './diamond_king.png';

import heart1 from './heart_1.png';
import heart2 from './heart_2.png';
import heart3 from './heart_3.png';
import heart4 from './heart_4.png';
import heart5 from './heart_5.png';
import heart6 from './heart_6.png';
import heart7 from './heart_7.png';
import heart8 from './heart_8.png';
import heart9 from './heart_9.png';
import heart10 from './heart_10.png';
import heartj from './heart_jack.png';
import heartq from './heart_queen.png';
import heartk from './heart_king.png';

import spade1 from './spade_1.png';
import spade2 from './spade_2.png';
import spade3 from './spade_3.png';
import spade4 from './spade_4.png';
import spade5 from './spade_5.png';
import spade6 from './spade_6.png';
import spade7 from './spade_7.png';
import spade8 from './spade_8.png';
import spade9 from './spade_9.png';
import spade10 from './spade_10.png';
import spadej from './spade_jack.png';
import spadeq from './spade_queen.png';
import spadek from './spade_king.png';

import back from './back-silver.png';

export const CardMapping: {[key:number]: string} = {
    0: back,
    1: club2,
    2: club3,
    3: club4,
    4: club5,
    5: club6,
    6: club7,
    7: club8,
    8: club9,
    9: club10,
    10: clubj,
    11: clubq,
    12: clubk,
    13: club1,
    14: diamond2,
    15: diamond3,
    16: diamond4,
    17: diamond5,
    18: diamond6,
    19: diamond7,
    20: diamond8,
    21: diamond9,
    22: diamond10,
    23: diamondj,
    24: diamondq,
    25: diamondk,
    26: diamond1,
    27: heart2,
    28: heart3,
    29: heart4,
    30: heart5,
    31: heart6,
    32: heart7,
    33: heart8,
    34: heart9,
    35: heart10,
    36: heartj,
    37: heartq,
    38: heartk,
    39: heart1,
    40: spade2,
    41: spade3,
    42: spade4,
    43: spade5,
    44: spade6,
    45: spade7,
    46: spade8,
    47: spade9,
    48: spade10,
    49: spadej,
    50: spadeq,
    51: spadek,
    52: spade1,
}

export const CardImage =(card: number)=> {
    if (card < 0) {
        return CardMapping[0]
    }
    return CardMapping[card + 1]
}