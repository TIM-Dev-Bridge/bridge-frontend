import React from 'react'
import styled from 'styled-components'
import { animate, motion } from 'framer-motion'
import Card from './Card'
import { indexOf, remove } from 'lodash'
import Hand, { HandPosition } from './Hand'
import { ConnectTable, useTable } from '../../TourRoom/UseTable'
import { socket, useScore } from '../../../Service/SocketService'
import BiddingPage from '../../Bidding/BiddingPage'
import { usePlayState } from '../../PlayingContext/PlayingContext'
import { AuthenContext, useAuthen } from '../../../Authen'
import { PlayCardRequest, SummaryRank, usePlaying } from '../../Bidding/UsePlaying'
import { useBidding } from '../../Bidding/UseBidding'
import DroppedCard from './DroppedCard'
import { useGame } from './GameContext'
import Summary from '../../Summary/Summary'
import TablePopup from "./TablePopup";
import PlaySideTab, { IPlaySideTabProps } from "./PlaySideTab";

interface PlayingPageProps {
    tableDetail?: ConnectTable;
}

interface PlayingDirectionFn {
    direction: HandPosition,
    updateCard: React.Dispatch<React.SetStateAction<number[]>>,
    animate: React.Dispatch<React.SetStateAction<boolean>>,
    dropCard: React.Dispatch<React.SetStateAction<number>>,
    isTurn: React.Dispatch<React.SetStateAction<boolean>>,
    title: React.Dispatch<React.SetStateAction<string>>
}

type PlayingDirection = {
  [key: number]: PlayingDirectionFn;
};

const PlayingPage = (props: PlayingPageProps) => {
    // enum PlayState {
    //     Bidding,
    //     Playing
    // }

    const { connect, updateCard, updateCardOpposite } = useTable()
    const game = useGame()
    const playContext = usePlayState()
    const authen = useAuthen()
    const {playCard, onInitialTurn, onDefaultTurn, onInitialPlaying, onInitialBidding, onFinishRound, onEnding, leave, onSummaryRank, onFinishTable} = usePlaying()
    const { subscribePlayingStatus } = useBidding()

    
    const [cards, setCards] = React.useState<number[]>([])
    const [leftCards, setLeftCards] = React.useState<number[]>([])
    const [rightCards, setRightCards] = React.useState<number[]>([])
    const [topCards, setTopCards] = React.useState<number[]>([])

    const southPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const rightPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const leftPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const topPlayedCardRef = React.useRef<HTMLDivElement>(null)

    const [droppedCard, setDroppedCard] = React.useState(<></>)
    const [leftDroppedCard, setLefttDroppedCard] = React.useState(<></>)
    const [rightDroppedCard, setRightDroppedCard] = React.useState(<></>)
    const [topDroppedCard, setTopDroppedCard] = React.useState(<></>)

    const [leftPlaceCardAnimate, setLeftPlaceCardAnimate] = React.useState(false)
    const [rightPlaceCardAnimate, setRightPlaceCardAnimate] = React.useState(false)
    const [topPlaceCardAnimate, setTopPlaceCardAnimate] = React.useState(false)

    // const [playDirection, setPlayDirection] = React.useState(-1)
    // const [turn, setTurn] = React.useState(-1)
    // const turnRef = React.useRef(turn)
    // const [declarer, setDeclarer] = React.useState(0)

    const [dropCardBottom, setDropCardBottom] = React.useState(0)
    const [dropCardLeft, setDropCardLeft] = React.useState(0)
    const [dropCardRight, setDropCardRight] = React.useState(0)
    const [dropCardTop, setDropCardTop] = React.useState(0)
    
    // const [playingDirection, setPlayingDirection] = React.useState<PlayingDirection>()
    // const playingDirectionRef = React.useRef(playingDirection)
    const [shouldWaiting, setShouldWaiting] = React.useState(false)
    const [shouldFinished, setShouldFinished] = React.useState(false)

    // const [currentSuite, setCurrentSuite] = React.useState<number|null>(null)

    const [shouldAnimateCollapse, setShouldAnimateCollapse] = React.useState(false)

    const [isTopTurn, setTopTurn] = React.useState(false)
    const [isLeftTurn, setLeftTurn] = React.useState(false)
    const [isRightTurn, setRightTurn] = React.useState(false)
    const [isBotTurn, setBotTurn] = React.useState(false)
    const [isFourthPlay, setIsFourthPlay] = React.useState(false)
    // const [trump, setTrump] = React.useState<number | null>(null)

    const [topName, setTopName] = React.useState("")
    const [leftName, setLeftName] = React.useState("")
    const [rightName, setRightName] = React.useState("")
    const [bottomName, setBottomName] = React.useState("")

    const [summaryRank, setSummaryRank] = React.useState<SummaryRank[]>([])
    // const [finishScore, setFinishScore] = React.useState<number[]>([])
    // const [finishTricks, setFinishTricks] = React.useState<number[]>([])


    const [selectedPopup, setSelectedPopup] = React.useState<string | null>(null);
    const switchSelectedPopup = (str: string) => { selectedPopup == str ? setSelectedPopup(null) : setSelectedPopup(str); };

    const [shouldPlay, setShouldPlay] = React.useState(false)

    const [willWait, setWillWait] = React.useState(false)
    const [willFinished, setWillFinished] = React.useState(false)
    // const [tempCard, setTempCard] = React.useState<number[]>([])
    // const cardsRef = React.useRef(cards)

    // const [sideTabInfo, setSideTabInfo] = React.useState<IPlaySideTabProps>({
    //   round: 1,
    //   permission: "player",
    //   boardsPerRound: 1,
    //   boardsPlayed: 1,
    //   totalRounds: 1,
    //   boardType: undefined,
    //   auction: undefined,
    //   tricks: {
    //     nsTricks: 0,
    //     ewTricks: 0,
    //   },
    //   setSelectedPopup: switchSelectedPopup,
    // }); 

    const directions: Record<number, "North" | "East" | "South" | "West"> = {
      0: "North",
      1: "East",
      2: "South",
      3: "West",
    };
  
    const suit: Record<number, string> = {
      0: "C",
      1: "D",
      2: "H",
      3: "S",
      4: "NT",
    };

    const CardSuite = {
      S: "Spade",
      H: "Heart",
      D: "Diamond",
      C: "Club",
      NT: "NoThrump",
    };

    // React.useEffect(() => {
    //     if (props.tableDetail != null || props.tableDetail != undefined) {
    //         connect(props.tableDetail.table_id, props.tableDetail)
    //     }
    // }, [props.tableDetail])

    // interface CardsStates {
    //   cards: number[],
    //   leftCards: number[],
    //   rightCards: number[],
    //   topCardz: number[],
    // }

    // const initialCardsStates = {
    //   cards: [],
    //   leftCards: [],
    //   rightCards: [],
    //   topCardz: [],
    // }

    // enum CardsActionType {
    //   UPDATE_CARDS = 'updateCards',
    // }

    // type CardsAction = |
    //   {
    //     type: CardsActionType.UPDATE_CARDS,
    //     payload: {cards: number[]}
    //   }

    // function cardsReducer(state: CardsStates, action: CardsAction): CardsStates {
    //   switch (action.type) {
    //     case CardsActionType.UPDATE_CARDS: {
    //       return {...state, cards: action.payload.cards}
    //     }
    //     default: {
    //       throw new Error(`Unhandled action type - ${JSON.stringify(action)}`);
    //     }
    //   }
    // }

    // const [cardsStates, cardsDispatch] = React.useReducer(cardsReducer, initialCardsStates) 
  

    interface PlayingStates {
      playDirection: number,
      currentSuite: number | null,
      trump: number | null,
      playingDirection: PlayingDirection,
      finishScores: number[],
      finishTricks: number[],
      declarer: number,
      turn: number,
      // shouldAnimateCollapse: boolean,
      // isFourthPlay: boolean,
      // shouldPlay: boolean
    }
  
  const initialPlayingStates = {
      playDirection: -1,
      currentSuite: null,
      trump: null,
      playingDirection: {},
      finishScores: [],
      finishTricks: [],
      declarer: 0,
      turn: -1,
      // shouldAnimateCollapse: false,
      // isFourthPlay: false,
      // shouldPlay: false,
  }

  enum PlayingActionType {
    INIT_PLAYINGDIRECTION = 'initPlayingDirection',
    DETERMINE_DECLARER = 'determineDeclarer',
    INITIAL_TURN = 'initialTurn',
    DEFAULT_TURN = 'defaultTurn',
    INITIAL_PLAYING = 'initialPlaying',
    FINISH_TABLE = 'finishTable',
    WAITING_FOR_BID = 'waitingForBid',
    RESET_ISTURN = 'resetIsTurn',
  }

  type PlayingAction = |
      {
        type: PlayingActionType.INIT_PLAYINGDIRECTION,
        payload: {
          playingDirection: PlayingDirection,
        }
      } |
      {
        type: PlayingActionType.DETERMINE_DECLARER,
        payload: {
          declarer: number,
          newCards: number[],
        }
      } |
      {
        type: PlayingActionType.INITIAL_TURN,
        payload: {
          playDirection: number,
          turn: number,
          currentSuite: number | null,
        }
      } |
      {
        type: PlayingActionType.DEFAULT_TURN,
        payload: {
          currentSuite: number | null,
          isFourthPlay: boolean,
          card: number,
          nextDirection: number,
          prevDirection: number,
        }
      } |
      {
        type: PlayingActionType.INITIAL_PLAYING,
        payload: {
          playDirection: number,
          turn: number,
          trump: number,
        }
      } |
      {
        type: PlayingActionType.FINISH_TABLE,
        payload: {
          finishTricks: number[],
          finishScores: number[],
        }
      } |
      {
        type : PlayingActionType.WAITING_FOR_BID,
        payload: { playDirection: number }
      } |
      {
        type : PlayingActionType.RESET_ISTURN,
      }

  function playingReducer(state: PlayingStates, action: PlayingAction): PlayingStates {
    switch (action.type) {
      case PlayingActionType.INIT_PLAYINGDIRECTION: {
        return {...state, playingDirection: action.payload.playingDirection}
      }
      case PlayingActionType.DETERMINE_DECLARER: {
        let cardEmpty = [-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13]
        state.playingDirection[action.payload.declarer].updateCard(action.payload.newCards)
        state.playingDirection[(action.payload.declarer + 1) % 4].updateCard(cardEmpty)
        state.playingDirection[(action.payload.declarer + 2) % 4].updateCard(cardEmpty)
        state.playingDirection[(action.payload.declarer + 3) % 4].updateCard(cardEmpty)
        return {...state, declarer: action.payload.declarer}
      }
      case PlayingActionType.INITIAL_TURN: {
        // state.playingDirection[action.payload.playDirection].isTurn(false)
        state.playingDirection[action.payload.playDirection].isTurn(true)
        state.playingDirection[(action.payload.playDirection + 1) % 4].isTurn(false)
        state.playingDirection[(action.payload.playDirection + 2) % 4].isTurn(false)
        state.playingDirection[(action.payload.playDirection + 3) % 4].isTurn(false)
        return {...state, playDirection: action.payload.playDirection, turn: action.payload.turn, currentSuite: action.payload.currentSuite}
      }
      case PlayingActionType.DEFAULT_TURN: {
        state.playingDirection[action.payload.nextDirection].isTurn(true)
        if (action.payload.prevDirection != playContext.playState.direction) {
          state.playingDirection[action.payload.prevDirection].dropCard(action.payload.card)
          state.playingDirection[action.payload.prevDirection].animate(true)
          state.playingDirection[action.payload.prevDirection].isTurn(false)
          state.currentSuite = action.payload.currentSuite
        }
        // if (action.payload.isFourthPlay) state.isFourthPlay = true
        return {...state, playDirection: action.payload.nextDirection}
      }
      case PlayingActionType.INITIAL_PLAYING: {
        state.playingDirection[action.payload.playDirection].isTurn(true)
        state.playingDirection[(action.payload.playDirection +1) % 4].isTurn(false)
        state.playingDirection[(action.payload.playDirection +1) % 4].isTurn(false)
        state.playingDirection[(action.payload.playDirection +1) % 4].isTurn(false)
        return {...state,
          playDirection: action.payload.playDirection,
          turn: action.payload.turn,
          trump: action.payload.trump,
          // shouldPlay: true,
        }
      }
      case PlayingActionType.FINISH_TABLE: {
        return {...state, finishTricks: action.payload.finishTricks, finishScores: action.payload.finishScores}
      }
      case PlayingActionType.WAITING_FOR_BID: {
        state.playingDirection[action.payload.playDirection].isTurn(true)
        state.playingDirection[(action.payload.playDirection +1) % 4].isTurn(false)
        state.playingDirection[(action.payload.playDirection +1) % 4].isTurn(false)
        state.playingDirection[(action.payload.playDirection +1) % 4].isTurn(false)
        return {...state}
      }
      case PlayingActionType.RESET_ISTURN:{
        state.playingDirection[0].isTurn(false)
        state.playingDirection[1].isTurn(false)
        state.playingDirection[2].isTurn(false)
        state.playingDirection[3].isTurn(false)
        return {...state}
      }
      default: {
        throw new Error(`Unhandled action type - ${JSON.stringify(action)}`);
      }
    }
  }

  const [playingStates, playingDispatch] = React.useReducer(playingReducer, initialPlayingStates) 

  const InitialSideTabStates :IPlaySideTabProps = {
    round: 1,
    permission: "player",
    boardsPerRound: 1,
    boardsPlayed: 1,
    totalRounds: 1,
    boardType: undefined,
    auction: undefined,
    tricks: {
      nsTricks: 0,
      ewTricks: 0,
    },
    setSelectedPopup: switchSelectedPopup,
  }; 

  enum SideTabActionType {
    INITIAL_BIDDING = 'initialBidding',
    INITIAL_PLAYING = 'initialPlaying',
    UPDATE_TRICKS = 'updateTricks',
  }

  type SideTabAction = |
      {
        type: SideTabActionType.INITIAL_BIDDING,
        payload: {
          boardType: {
            boardNo: number,
            dealer: "N"| "E"| "S"| "W",
            vulnerable: "None"| "N-S"| "E-W"| "All",
          },
          boardsPerRound: number,
          cur_board: number,
          round: number,
          totalRounds: number,
        }
      } |
      {
        type: SideTabActionType.INITIAL_PLAYING,
        payload: {
          auction: {
            declarer: "North" | "South" | "East" | "West";
            contract: string;
          },
        }
      } |
      {
        type: SideTabActionType.UPDATE_TRICKS,
        payload: {
          tricks: {
            ewTricks: number,
            nsTricks: number,
          },
        }
      }

  function sideTabReducer(state: IPlaySideTabProps, action: SideTabAction): IPlaySideTabProps {
    switch (action.type) {
      case SideTabActionType.INITIAL_BIDDING: {
        return {...state,
          boardType: {
            boardNo: action.payload.boardType.boardNo,
            dealer: action.payload.boardType.dealer,
            vulnerable: action.payload.boardType.vulnerable,
          },
          auction: undefined,
          tricks: {
            ewTricks: 0,
            nsTricks: 0,
          },
          boardsPerRound: action.payload.boardsPerRound,
          boardsPlayed: action.payload.cur_board - (Math.floor((action.payload.cur_board-1)/action.payload.boardsPerRound)),
          round: action.payload.round,
          totalRounds: action.payload.totalRounds,
        }
      }
      case SideTabActionType.INITIAL_PLAYING:{
        return {...state, 
          auction: {
            declarer: action.payload.auction.declarer,
            contract: action.payload.auction.contract,
          }}
      }
      case SideTabActionType.UPDATE_TRICKS:{
        return {...state,
          tricks: {
            ewTricks: action.payload.tricks.ewTricks,
            nsTricks: action.payload.tricks.nsTricks,
          },}
      }
      default: {
        throw new Error(`Unhandled action type - ${JSON.stringify(action)}`);
      }
    
    }
  }

  const [sideTabStates, sideTabDispatch] = React.useReducer(sideTabReducer, InitialSideTabStates) 
    

    React.useEffect(() => {
        if (playContext.playState.table != null && playContext.playState.table != undefined && playContext.playState.table != "") {
            const detail: ConnectTable = {
                player_id: authen.authen.username,
                player_name: authen.authen.username,
                tour_name: playContext.playState.tourName,
                direction: playContext.playState.direction,
                room: playContext.playState.room,
                round_num: playContext.playState.round,
                table_id: playContext.playState.table
            }
            const newState: PlayingDirection = {
                [playContext.playState.direction] : {
                    direction: HandPosition.DOWN,
                    updateCard: ()=>{},
                    animate: ()=>{},
                    dropCard: ()=>{},
                    isTurn: setBotTurn,
                    title: setBottomName
                },
                [(playContext.playState.direction + 1) % 4] : {
                    direction: HandPosition.LEFT,
                    updateCard: setLeftCards,
                    animate: setLeftPlaceCardAnimate,
                    dropCard: setDropCardLeft,
                    isTurn: setLeftTurn,
                    title: setLeftName
                },
                [(playContext.playState.direction + 3) % 4] : {
                    direction: HandPosition.RIHGT,
                    updateCard: setRightCards,
                    animate: setRightPlaceCardAnimate,
                    dropCard: setDropCardRight,
                    isTurn: setRightTurn,
                    title: setRightName
                },
                [(playContext.playState.direction + 2) % 4] : {
                    direction: HandPosition.TOP,
                    updateCard: setTopCards,
                    animate: setTopPlaceCardAnimate,
                    dropCard: setDropCardTop,
                    isTurn: setTopTurn,
                    title: setTopName
                }
            }
            // setPlayingDirection(newState)
            playingDispatch({
              type: PlayingActionType.INIT_PLAYINGDIRECTION,
              payload: {
                playingDirection: newState
              }
            })
            console.log("CURRENT ROUND",playContext.playState.data, playContext.playState.currentRound)
            let currentdata = playContext.playState.data[playContext.playState.currentRound - 1]
            let currentTable = currentdata.tables.find(table => table.table_id == playContext.playState.table)

            let bottom = playContext.playState.direction
            let left = (playContext.playState.direction + 1) % 4
            let top = (playContext.playState.direction + 2) % 4
            let right =  (playContext.playState.direction + 3) % 4

            newState[bottom].title(currentTable?.directions.find(dir => dir.direction == bottom)?.id + " ( " + directionFromnum(bottom) + " ) " )
            newState[left].title(currentTable?.directions.find(dir => dir.direction == left)?.id + " ( " + directionFromnum(left) + " ) " )
            newState[top].title(currentTable?.directions.find(dir => dir.direction == top)?.id + " ( " + directionFromnum(top) + " ) " )
            newState[right].title(currentTable?.directions.find(dir => dir.direction == right)?.id + " ( " + directionFromnum(right) + " ) " )
            
            connect(playContext.playState.table, detail)
            
        }
    }, [playContext.playState.table])

    const directionFromnum =(direction: number)=> {
        if (direction == 0) {
            return "N"
        }
        if (direction == 1) {
            return "E"
        }
        if (direction == 2) {
            return "S"
        }
        if (direction == 3) {
            return "W"
        }
    }

    React.useEffect(() => {
        updateCard((cards) => {
            let cardString = cards.map(num => num.toString())
            console.log("cards update", cards, cardString)
            // cardsDispatch({type: CardsActionType.UPDATE_CARDS, payload:{cards: cards}})
            setCards(cards)
            // cardsRef.current = cards
        })
        onFinishRound( data => {
            if (data.length == playContext.playState.tableCount) {
                console.log("FINISH", data)
                const newRound = playContext.playState.currentRound + 1
                if (playContext.playState.data[newRound - 1] == undefined) {
                    setWillFinished(true)
                    // setShouldFinished(true)
                    return 
                }
                const tableOfNewRound = playContext.playState.data[newRound - 1].tables
                if (tableOfNewRound == null) {
                    setWillFinished(true)
                    // setShouldFinished(true)
                    return 
                }
                const table = tableOfNewRound.find( table => table.versus.includes(playContext.playState.pairId.toString()))
                const tableId = table?.table_id
                const detail: ConnectTable = {
                    player_id: authen.authen.username,
                    player_name: authen.authen.username,
                    tour_name: playContext.playState.tourName,
                    direction: table?.directions.find(player => player.id == authen.authen.username)?.direction,
                    room: table?.table_id ?? "",
                    round_num: newRound.toString(),
                    table_id: table?.table_id ?? ""
                }
                leave(playContext.playState.table)
                playContext.updatePlayState({
                    ...playContext.playState,
                    room: tableId ?? "",
                    round: newRound.toString(),
                    table: tableId ?? "",
                    direction: table?.directions.find(player => player.id == authen.authen.username)?.direction,
                    status: "",
                    currentRound: newRound
                })
                connect(tableId ?? "", detail)
                game.reset()
                setShouldWaiting(false)
            }
        })

      onEnding( ()=> {
        console.log("WAITING PLEASE")
        setWillWait(true)
      })

      onSummaryRank( rank => {
        console.log("RANK ::", rank)
        setSummaryRank(rank)
      })

    }, [socket])



    React.useEffect(() => {
        updateCardOpposite((newcards, direction) => {
            let cardString = cards.map(num => num.toString())
            console.log("cards update", cards, cardString)
            playingDispatch({
              type: PlayingActionType.DETERMINE_DECLARER,
               payload: {
                 declarer: direction,
                 newCards: newcards
                }
              })
            playContext.updatePlayState({
                tourName: playContext.playState.tourName,
                room: playContext.playState.room,
                round: playContext.playState.round,
                table: playContext.playState.table,
                direction: playContext.playState.direction,
                status: 'initial_playing',
                pairId: playContext.playState.pairId,
                currentRound: playContext.playState.currentRound,
                tableCount: playContext.playState.tableCount,
                data: playContext.playState.data
            })
        })

        onInitialTurn( data => {
          console.log("OnInitialTurn DATA : ", data)
          playingDispatch({
            type: PlayingActionType.INITIAL_TURN,
            payload: {
              playDirection: data.payload.leader,
              turn: data.payload.turn,
              currentSuite: null,
            }
          })
        })

        onDefaultTurn( data => {
          console.log("DATA : ", data)
          playingDispatch({type: PlayingActionType.DEFAULT_TURN, 
            payload:{
              card: data.payload.card,
              currentSuite: data.payload['initSuite'],
              isFourthPlay: data.payload.isFourthPlay,
              nextDirection: data.payload.nextDirection,
              prevDirection: data.payload.prevDirection,
            }
          })

          if (data.payload.isFourthPlay) {
            console.log("ANIMATE COLLAPSE PLEASE")
            setIsFourthPlay(true)
            setShouldAnimateCollapse(true)
            playingDispatch({type: PlayingActionType.RESET_ISTURN})
          }
        
        })

        onInitialPlaying( data => {
            console.log("DATA : ", data)
            playingDispatch({type: PlayingActionType.INITIAL_PLAYING, payload:{
              playDirection: data.payload.leader,
              turn: data.payload.turn,
              trump: data.payload.bidSuite
            }} )

            setShouldPlay(true)
        })

        onFinishTable((finishTable) =>{
          console.log('FINISH TABLE',finishTable)
          playingDispatch({type: PlayingActionType.FINISH_TABLE, payload:{
            finishTricks: finishTable.tricks,
            finishScores: finishTable.scores,
          }})
        })

        subscribePlayingStatus(status => {
          if (status['status'] == 'waiting_for_bid') {
              if (status['payload'].hasOwnProperty('nextDirection')) {
                  console.log("BIDDING STATUS", status['payload']['nextDirection'])
                  playingDispatch({type: PlayingActionType.WAITING_FOR_BID, payload: {playDirection: status['payload']['nextDirection']}})
                  console.log("UPDATE", playingStates.playingDirection)
              }
          }
      })

    }, [socket, playingDispatch])

        React.useEffect(()=> {
        onInitialBidding( data => {
          console.log('onInitialBidding')
          sideTabDispatch({type:SideTabActionType.INITIAL_BIDDING, payload:{
            boardType:{
              boardNo: data.payload.board_type.board_number,
              dealer: data.payload.board_type.dealer,
              vulnerable: data.payload.board_type.vulnerable,
            },
            boardsPerRound: data.payload.board_per_round,
            cur_board: data.payload.cur_board,
            round: data.payload.cur_round,
            totalRounds: data.payload.total_round,
          }})
        })

        onInitialPlaying( data => {
          console.log('onInitialPlaying')
          sideTabDispatch({type:SideTabActionType.INITIAL_PLAYING, payload:{
            auction: {
              declarer: directions[(data.payload.leader+3)%4],
              contract:
                Math.ceil(data.payload.maxContract / 5).toString() +
                "_" +
                suit[data.payload.maxContract % 5].toString(),
            },
          }})
        })

        onInitialTurn( data => {
          console.log('onInitialTurn')
          sideTabDispatch({type:SideTabActionType.UPDATE_TRICKS, payload:{
            tricks: {
              ewTricks: data.payload.tricks[1],
              nsTricks: data.payload.tricks[0],
            },
          }})
        })

        onEnding( data => {
          console.log('onEnding')
          data &&
          sideTabDispatch({type:SideTabActionType.UPDATE_TRICKS, payload:{
            tricks: {
              ewTricks: data.payload.tricks[1],
              nsTricks: data.payload.tricks[0],
            },
          }})
        })

    },[socket,sideTabDispatch])

//     React.useEffect(() => {
//       updateCardOpposite((newcards, direction) => {
//           let cardString = cards.map(num => num.toString())
//           console.log("cards update", cards, cardString)

// {/*             directionsRef.current[direction](newcards) */}

//           // playingDirectionRef.current?.[direction].updateCard(newcards)
//           // let cardEmpty = [-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13]
//           // playingDirectionRef.current?.[(direction + 1) % 4].updateCard(cardEmpty)
//           // playingDirectionRef.current?.[(direction + 2) % 4].updateCard(cardEmpty)
//           // playingDirectionRef.current?.[(direction + 3) % 4].updateCard(cardEmpty)
//           // playingDirectionRef.current?.[playContext.playState.direction].updateCard(cardsRef.current)

//           playingDispatch({
//             type: PlayingActionType.DETERMINE_DECLARER,
//              payload: {
//                declarer: direction,
//                newCards: newcards
//               }
//             })
//           // cardsDispatch({type: CardsActionType.UPDATE_OTHER_CARDS,})
//           // setDeclarer(direction)
//           playContext.updatePlayState({
//               tourName: playContext.playState.tourName,
//               room: playContext.playState.room,
//               round: playContext.playState.round,
//               table: playContext.playState.table,
//               direction: playContext.playState.direction,
//               status: 'initial_playing',
//               pairId: playContext.playState.pairId,
//               currentRound: playContext.playState.currentRound,
//               tableCount: playContext.playState.tableCount,
//               data: playContext.playState.data
//           })
//       })

//     }, [socket, declarer, cards])

    // React.useEffect(()=> {
    //     onInitialTurn( data => {
    //         console.log("DATA : ", data)
    //         // let direction = data.payload.leader

    //         playingDispatch({
    //           type: PlayingActionType.INITIAL_TURN,
    //           payload: {
    //             playDirection: data.payload.leader,
    //             turn: data.payload.turn,
    //             currentSuite: null,
    //           }
    //         })

    //         // setPlayDirection(direction)
    //         // setTurn(data.payload.turn)
    //         // setCurrentSuite(null)
    //         // playingDirection?.[direction].isTurn(true)
    //         // playingDirection?.[(direction + 1) % 4].isTurn(false)
    //         // playingDirection?.[(direction + 2) % 4].isTurn(false)
    //         // playingDirection?.[(direction + 3) % 4].isTurn(false)
    //         // animateDirectionRef.current[direction](true)
    //         // animateDirection[direction](true)
    //     })
    //   // }, [socket, playDirection, currentSuite])
    // }, [socket, playingDispatch])

    // React.useEffect(()=> {
    //     onDefaultTurn( data => {
    //         console.log("DATA : ", data)
    //         playingDispatch({type: PlayingActionType.DEFAULT_TURN, 
    //         payload:{
    //           card: data.payload.card,
    //           currentSuite: data.payload['initSuite'],
    //           isFourthPlay: data.payload.isFourthPlay,
    //           nextDirection: data.payload.nextDirection,
    //           prevDirection: data.payload.prevDirection,
    //         }
    //       })

    //       if (data.payload.isFourthPlay) {
    //         console.log("ANIMATE COLLAPSE PLEASE")
    //         setIsFourthPlay(true)
    //         setShouldAnimateCollapse(true)
    //         playingDispatch({type: PlayingActionType.RESET_ISTURN})
    //       }
    //         // let direction = data.payload.nextDirection
    //         // let prev = data.payload.prevDirection
    //         // setPlayDirection(direction)
    //         // playingDirection?.[direction].isTurn(true)
    //         // setTurn(turn => turn += 1)
    //         // if (prev != playContext.playState.direction) {
    //         //     playingDirection?.[prev].dropCard(data.payload.card)
    //         //     playingDirection?.[prev].animate(true)
    //         //     playingDirection?.[prev].isTurn(false)
    //         //     setCurrentSuite(data.payload['initSuite'])
    //         //     if (trump != data.payload.bidSuite) {
    //         //         setTrump(data.payload.bidSuite)
    //         //     }
    //         //     if (declarer == data.payload.nextDirection) {

    //         //     }
    //         // }

            
    //     })
    // // }, [socket, playDirection, currentSuite, shouldAnimateCollapse, trump])
    // }, [socket, playingDispatch])

    // React.useEffect(()=> {
    //     onInitialPlaying( data => {
    //         console.log("DATA : ", data)
    //         playingDispatch({type: PlayingActionType.INITIAL_PLAYING, payload:{
    //           playDirection: data.payload.leader,
    //           turn: data.payload.turn,
    //           trump: data.payload.bidSuite
    //         }} )

    //         setShouldPlay(true)
    //         // let direction = data.payload.leader
    //         // setPlayDirection(direction)
    //         // setTurn(data.payload.turn)
    //         // setTrump(data.payload.bidSuite)
    //         // playingDirection?.[direction].isTurn(true)
    //         // playingDirection?.[(direction + 1) % 4].isTurn(false)
    //         // playingDirection?.[(direction + 2) % 4].isTurn(false)
    //         // playingDirection?.[(direction + 3) % 4].isTurn(false)

    //         // setSideTabInfo({
    //         //   ...sideTabInfo,
    //         //   auction: {
    //         //     declarer: directions[data.payload.leader],
    //         //     contract:
    //         //       Math.ceil(data.payload.maxContract / 5).toString() +
    //         //       "_" +
    //         //       suit[data.payload.maxContract % 5].toString(),
    //         //   },
    //         // });
    //     })
    //   // }, [socket, playDirection, playingDirection])
    // }, [socket, playingDispatch])

  //   React.useEffect(()=>{
  //     onFinishTable((finishTable) =>{
  //       console.log('FINISH TABLE',finishTable)
  //       playingDispatch({type: PlayingActionType.FINISH_TABLE, payload:{
  //         finishTricks: finishTable.tricks,
  //         finishScores: finishTable.scores,
  //       }})
  //       // setFinishTricks(finishTable.tricks)
  //       // setFinishScore(finishTable.scores)
  //     })
  //   // },[socket, finishScore, finishTricks])
  // },[socket, playingDispatch])


    // React.useEffect(()=> {
    //     onFinishRound( data => {
    //         if (data.length == playContext.playState.tableCount) {
    //             console.log("FINISH", data)
    //             const newRound = playContext.playState.currentRound + 1
    //             if (playContext.playState.data[newRound - 1] == undefined) {
    //                 setWillFinished(true)
    //                 // setShouldFinished(true)
    //                 return 
    //             }
    //             const tableOfNewRound = playContext.playState.data[newRound - 1].tables
    //             if (tableOfNewRound == null) {
    //                 setWillFinished(true)
    //                 // setShouldFinished(true)
    //                 return 
    //             }
    //             const table = tableOfNewRound.find( table => table.versus.includes(playContext.playState.pairId.toString()))
    //             const tableId = table?.table_id
    //             const detail: ConnectTable = {
    //                 player_id: authen.authen.username,
    //                 player_name: authen.authen.username,
    //                 tour_name: playContext.playState.tourName,
    //                 direction: table?.directions.find(player => player.id == authen.authen.username)?.direction,
    //                 room: table?.table_id ?? "",
    //                 round_num: newRound.toString(),
    //                 table_id: table?.table_id ?? ""
    //             }
    //             leave(playContext.playState.table)

    //             playContext.updatePlayState({
    //                 ...playContext.playState,
    //                 room: tableId ?? "",
    //                 round: newRound.toString(),
    //                 table: tableId ?? "",
    //                 direction: table?.directions.find(player => player.id == authen.authen.username)?.direction,
    //                 status: "",
    //                 currentRound: newRound
    //             })

                
    //             connect(tableId ?? "", detail)
    //             game.reset()
    //             setShouldWaiting(false)
                
    //         }
    //     })
    // }, [socket])

    // React.useEffect(()=> {
    //     onEnding( ()=> {
    //         console.log("WAITING PLEASE")
    //         setWillWait(true)
    //     })
    // }, [socket])


    // React.useEffect(()=> {
    //     turnRef.current = turn
    // }, [turn])
    
    // React.useEffect(()=> {
    //     playingDirectionRef.current = playingDirection
    // }, [playingDirection])

    // React.useEffect(()=> {
    //     onSummaryRank( rank => {
    //         console.log("RANK ::", rank)
    //         setSummaryRank(rank)
    //     })
    // }, [socket, summaryRank])

    // React.useEffect(()=> {
    //     subscribePlayingStatus(status => {
    //         if (status['status'] == 'waiting_for_bid') {
    
    //             if (status['payload'].hasOwnProperty('nextDirection')) {
    //                 console.log("BIDDING STATUS", status['payload']['nextDirection'])
    //                 playingDispatch({type: PlayingActionType.WAITING_FOR_BID, payload: {playDirection: status['payload']['nextDirection']}})
    //                 // let direction = status['payload']['nextDirection']
    //                 // playingDirection?.[direction].isTurn(true)
    //                 // playingDirection?.[(direction + 1) % 4].isTurn(false)
    //                 // playingDirection?.[(direction + 2) % 4].isTurn(false)
    //                 // playingDirection?.[(direction + 3) % 4].isTurn(false)

    //                 // console.log("UPDATE", playingDirection)
    //                 console.log("UPDATE", playingStates.playingDirection)
    //             }
    //             else {
    //                 // setLvlToBid(lvlToBid())
    //             }
    //         }
    //     })
    //   // }, [socket, playingDirection])
    // }, [socket, playingDispatch])

    const makePlayCardRequest =(card: number, turn: number)=> {
        let request : PlayCardRequest = {
            player_id: authen.authen.username,
            room: playContext.playState.room,
            card: card,
            direction: playContext.playState.direction,
            turn: turn,
            tour_name: playContext.playState.tourName,
            round_num: playContext.playState.round,
            table_id: playContext.playState.table
        }
        playCard(request)
    }

  const dropCard = (
    animateAnimation: React.Dispatch<React.SetStateAction<boolean>>,
    dropFunction: React.Dispatch<React.SetStateAction<JSX.Element>>
  ) => {
    animateAnimation(false);

    return dropFunction;
  };

  const variants = {
    collapse: {
      scale: 0.8,
      opacity: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
    normal: {
      scale: 1,
      opacity: 1,
    },
  };


    return (
      <Container>
        <PlaySideTab {...sideTabStates} />
      {/* <div style={{ width: "85%", height: "100%" }}> */}
      <TablePopupContainer>
        <TablePopup
          selectedPopup={selectedPopup}
          setSelectedPopup={setSelectedPopup}
        />
      </TablePopupContainer>
      
        <PlayingPageContainer>
            {/* <InnerContainer isYourTurn={playDirection == playContext.playState.direction}> */}
            <InnerContainer isYourTurn={playingStates.playDirection == playContext.playState.direction}>
                
                <Center
                    variants={variants}
                    initial="normal"
                    // animate={shouldAnimateCollapse ? "collapse" : "normal"}
                    animate={shouldAnimateCollapse ? "collapse" : "normal"}
                    onAnimationComplete={()=> {
                        setTopDroppedCard(<></>)
                        setLefttDroppedCard(<></>)
                        setRightDroppedCard(<></>)
                        setDroppedCard(<></>)
                        setShouldPlay(true)
                        setShouldAnimateCollapse(false)
                        setIsFourthPlay(false)
                    }}
                >
                    <CenterTop>
                        <PlayedCard ref={topPlayedCardRef}>
                            {topDroppedCard}
                        </PlayedCard>
                    </CenterTop>
                    <CenterSouth>
                        <PlayedCard ref={southPlayedCardRef}>
                            {droppedCard}
                        </PlayedCard>
                    </CenterSouth>
                    <CenterLeft>
                        <PlayedCard ref={leftPlayedCardRef}>
                            {leftDroppedCard}
                        </PlayedCard>
                    </CenterLeft>
                    <CenterRight>
                        <PlayedCard ref={rightPlayedCardRef}>
                            {rightDroppedCard}
                        </PlayedCard>
                    </CenterRight>
                </Center>
                <Hand
                    enabled={false}
                    position={HandPosition.TOP}
                    initialCard={topCards}
                    dropRef={topPlayedCardRef}
                    placeCard={topPlaceCardAnimate}
                    cardToFind={dropCardTop}
                    isTurn={isTopTurn}
                    // trump={trump}
                    trump={playingStates.trump}
                    playerName={topName}
                    onDrop={() => {
                        dropCard(setTopPlaceCardAnimate, setTopDroppedCard)(<DroppedCard text={dropCardTop} />)
                        }} 
                    onAnimatinoComplete={()=> {
                        if (isFourthPlay) {
                            setShouldAnimateCollapse(true)
                        }
                        // if (playDirection == playContext.playState.direction) {
                        if (playingStates.playDirection == playContext.playState.direction) {
                          setShouldPlay(true)
                        }

                        if (willWait) {
                          setShouldWaiting(true)
                        }
                        if (willFinished) {
                          setShouldFinished(true)
                        }
                    }}/>
                <Hand
                    // enabled={playDirection == playContext.playState.direction && shouldPlay}
                    enabled={playingStates.playDirection == playContext.playState.direction && shouldPlay}
                    position={HandPosition.DOWN}
                    initialCard={cards}
                    dropRef={southPlayedCardRef}
                    cardToFind={dropCardBottom}
                    // currentSuite={currentSuite}
                    currentSuite={playingStates.currentSuite}
                    isTurn={isBotTurn}
                    // trump={trump}
                    trump={playingStates.trump}
                    playerName={bottomName}
                    onDrop={(item)=> {
                        setDroppedCard(<DroppedCard text={item} />)
                        // makePlayCardRequest(item, turnRef.current)}} 
                        makePlayCardRequest(item, playingStates.turn)}} 
                    onAnimatinoComplete={()=> {
                        if (isFourthPlay) {
                            setShouldAnimateCollapse(true)
                        }
                        // if (playDirection == playContext.playState.direction) {
                        if (playingStates.playDirection == playContext.playState.direction) {
                          setShouldPlay(true)
                        }
                        if (willWait) {
                          setShouldWaiting(true)
                        }
                        if (willFinished) {
                          setShouldFinished(true)
                        }
                    }}/>
                <Hand
                    enabled={false}
                    position={HandPosition.LEFT}
                    initialCard={leftCards}
                    dropRef={leftPlayedCardRef}
                    cardToFind={dropCardLeft}
                    isTurn={isLeftTurn}
                    // trump={trump}
                    trump={playingStates.trump}
                    playerName={leftName}
                    onDrop={() => {
                        dropCard(setLeftPlaceCardAnimate, setLefttDroppedCard)(<DroppedCard text={dropCardLeft} />)
                        }}
                    placeCard={leftPlaceCardAnimate}
                    onAnimatinoComplete={()=> {
                        if (isFourthPlay) {
                            setShouldAnimateCollapse(true)
                        }
                        // if (playDirection == playContext.playState.direction) {
                        if (playingStates.playDirection == playContext.playState.direction) {
                          setShouldPlay(true)
                        }
                        if (willWait) {
                          setShouldWaiting(true)
                        }
                        if (willFinished) {
                          setShouldFinished(true)
                        }
                    }} />
                <Hand
                    enabled={false}
                    position={HandPosition.RIHGT}
                    initialCard={rightCards}
                    dropRef={rightPlayedCardRef}
                    placeCard={rightPlaceCardAnimate}
                    cardToFind={dropCardRight}
                    isTurn={isRightTurn}
                    // trump={trump}
                    trump={playingStates.trump}
                    playerName={rightName}
                    onDrop={() => {
                        dropCard(setRightPlaceCardAnimate, setRightDroppedCard)(<DroppedCard text={dropCardRight} />)
                        }} 
                    onAnimatinoComplete={()=> {
                        if (isFourthPlay) {
                            setShouldAnimateCollapse(true)
                        }
                        // if (playDirection == playContext.playState.direction) {
                        if (playingStates.playDirection == playContext.playState.direction) {
                          setShouldPlay(true)
                        }
                        if (willWait) {
                          setShouldWaiting(true)
                        }
                        if (willFinished) {
                          setShouldFinished(true)
                        }
                    }}/>
            </InnerContainer>

            <PopupArea visible={playContext.playState.status == 'waiting_for_bid'}>
                <BiddingPage />
            </PopupArea>
            <WaitingPage visible={shouldWaiting}>
                {/* <>Wait for other table to complete</> */}
                <TitleText> 
                  {
                  // ((game.connectDetail?.direction as number + 2) % 4 == declarer || (game.connectDetail?.direction as number) == declarer)
                  ((game.connectDetail?.direction as number + 2) % 4 == playingStates.declarer || (game.connectDetail?.direction as number) == playingStates.declarer)
                  // ? (declarer % 2 == 0
                    ? (playingStates.declarer % 2 == 0
                      ? (sideTabStates.tricks?.nsTricks as number >= parseInt(sideTabStates.auction?.contract.split("_")[0] as string) + 6 ? "Contract Successful" : "Contract Failed")
                      : (sideTabStates.tricks?.ewTricks as number >= parseInt(sideTabStates.auction?.contract.split("_")[0] as string) + 6 ? "Contract Successful" : "Contract Failed")
                      )
                      // : (declarer % 2 == 0
                    : (playingStates.declarer % 2 == 0
                      ? (sideTabStates.tricks?.nsTricks as number >= parseInt(sideTabStates.auction?.contract.split("_")[0] as string) + 6 ? "Defend Failed" : "Defend Successful")
                      : (sideTabStates.tricks?.ewTricks as number >= parseInt(sideTabStates.auction?.contract.split("_")[0] as string) + 6 ? "Defend Failed" : "Defend Successful")
                      )
                  }
                </TitleText>
                <Panel>
                <PanelTop>
                  <CenteredText style={{ position: "relative", fontSize: "2vmin" }}>
                    <b>Contract</b>
                  </CenteredText>
                </PanelTop>
                  <tbody>
                    <CenteredText style={{ position: "relative", fontSize: "5vmin" }}>
                    <b>{sideTabStates.auction ? sideTabStates.auction.contract.split("_")[0] : "N/A"}</b>
                    {sideTabStates.auction ? (
                      sideTabStates.auction.contract.split("_")[1] == "NT" ? (
                        "NT"
                      ) : (
                        <img
                          src={
                            require(`./../../../assets/images/CardSuite/${
                              CardSuite[
                                sideTabStates.auction.contract.split(
                                  "_"
                                )[1] as keyof typeof CardSuite
                              ]
                            }.svg`).default
                          }
                          height="auto"
                          width="30vw"
                          style={{ display: "inline-block", verticalAlign: "baseline" }}
                        />
                      )
                    ) : (
                      ""
                    )}
                              
                    </CenteredText>
                  </tbody>
                </Panel>
                <BottomWaitContainer>
                  <Panel>
                    <PanelTop>
                      <CenteredText style={{ position: "relative", fontSize: "2vmin" }}>
                        <b>Tricks earn</b>
                      </CenteredText>
                    </PanelTop>
                    <tbody>
                      <CenteredText style={{ position: "relative", fontSize: "5vmin" }}>
                        <b>{(game.connectDetail?.direction as number) % 2 == 0 ? sideTabStates.tricks?.nsTricks : sideTabStates.tricks?.ewTricks}</b>
                      </CenteredText>
                    </tbody>
                  </Panel>
                  <Panel>
                    <PanelTop>
                      <CenteredText style={{ position: "relative", fontSize: "2vmin" }}>
                        <b>Scores</b>
                      </CenteredText>
                    </PanelTop>
                    <tbody>
                    <CenteredText style={{ position: "relative", fontSize: "5vmin" }}>
                        {/* <b>{(game.connectDetail?.direction as number) % 2 == 0 ? finishScore[0] : finishScore[1]}</b> */}
                        <b>{(game.connectDetail?.direction as number) % 2 == 0 ? playingStates.finishScores[0] : playingStates.finishScores[1]}</b>
                      </CenteredText>
                    </tbody>
                    </Panel>
                </BottomWaitContainer>
                <CenteredText> <b>Please wait for other competitor to finish current board</b> </CenteredText>
            </WaitingPage>
            <WaitingPage visible={shouldFinished}>
                {/* <>Finished</> */}
                <Summary summaryRank={summaryRank} />
            </WaitingPage>
        </PlayingPageContainer>
        </Container>
    )
}


// const PlayingPageContainer = styled.div`
//     /* width: 70vw; */
//     width: 100%;
//     /* height: 0; */
//     zoom: 1;
//     /* padding-bottom: 75%; */
//     width: 100%;
//     position: relative;
//     overflow: hidden;
// `

const PlayingPageContainer = styled.div`
  /* width: 70vw; */
  width: 85%;
  /* height: 0; */
  zoom: 1;
  /* padding-bottom: 75%; */
  /* width: 100%; */
  position: relative;
`;


const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100vw;
`;

const TablePopupContainer = styled.div`
  width: 85vw;
  height: 100vh;
  display: flex;
  position: absolute;
  left: 15%;
  justify-content: center;
  align-items: center;
  background-color: #0c6b3f;
  text-align: center;
`;

const RatioContainer = styled.div`
  background-color: green;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const InnerContainer = styled.div<{ isYourTurn: boolean }>`
  background-color: white;
  display: grid;
  /* position: absolute; 
    top: 0;
    left: 0; */
  /* margin: 0 auto; */
  width: 100%;
  height: 100%;
  border: ${(props) =>
    props.isYourTurn ? "5px solid green" : "5px solid white"};
  /* aspect-ratio: 16 / 10; */
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
`;

const Center = styled(motion.div)`
  grid-row: 2;
  grid-column: 2;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
  /* box-shadow: var(--app-shadow); */
  border-radius: 16px;
`;

const CenterTop = styled.div`
  grid-row: 1;
  grid-column: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: green; */
  width: 10vw;
  max-width: 10em;
  aspect-ratio: 1 / 1;
`;

const CenterSouth = styled.div`
  grid-row: 3;
  grid-column: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: green; */
  width: 10vw;
  max-width: 10em;
  aspect-ratio: 1 / 1;
`;

const CenterRight = styled.div`
  grid-row: 2;
  grid-column: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: green; */
  width: 10vw;
  max-width: 10em;
  aspect-ratio: 1 / 1;
`;

const CenterLeft = styled.div`
  grid-row: 2;
  grid-column: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: green; */
  width: 10vw;
  max-width: 10em;
  aspect-ratio: 1 / 1;
`;

const PlayedCard = styled.div`
  width: 5vw;
  max-width: 4em;
  aspect-ratio: 169 / 244;
  /* background-color: red; */
  /* box-shadow: var(--app-shadow); */
`;

const Iframe = styled.iframe`
  display: block;
  border: 0px;
  margin: 0px auto;
  padding: 0px;
`;

const TitleText = styled.p`
  font-size: 5vh;
  font-weight: bold;
  color: black;
  text-align: center;
  width: 80%;
`

const PopupArea = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const WaitingPage = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #007346;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 5vh;
  align-items: center;
  align-content: center;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const Panel = styled.div`
  position: relative;
  display: table;
  align-items: center;
  width: 20vw;
  height: 15vh;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 4px 4px 22px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;
`;

const PanelTop = styled.thead`
  background-color: White;
  height: 33.3333%;
  width: 100%;
`;

const CenteredText = styled.p`
  text-align: center;
  width: 100%;
  top: 50%;
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
`;

const BottomWaitContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  column-gap: 5vw;
`

export default PlayingPage;
