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
    1: club1,
    2: club2,
    3: club3,
    4: club4,
    5: club5,
    6: club6,
    7: club7,
    8: club8,
    9: club9,
    10: club10,
    11: clubj,
    12: clubq,
    13: clubk,
    14: diamond1,
    15: diamond2,
    16: diamond3,
    17: diamond4,
    18: diamond5,
    19: diamond6,
    20: diamond7,
    21: diamond8,
    22: diamond9,
    23: diamond10,
    24: diamondj,
    25: diamondq,
    26: diamondk,
    27: heart1,
    28: heart2,
    29: heart3,
    30: heart4,
    31: heart5,
    32: heart6,
    33: heart7,
    34: heart8,
    35: heart9,
    36: heart10,
    37: heartj,
    38: heartq,
    39: heartk,
    40: spade1,
    41: spade2,
    42: spade3,
    43: spade4,
    44: spade5,
    45: spade6,
    46: spade7,
    47: spade8,
    48: spade9,
    49: spade10,
    50: spadej,
    51: spadeq,
    52: spadek,
}

export const CardImage =(card: number)=> {
    if (card < 0) {
        return CardMapping[0]
    }
    return CardMapping[card + 1]
}