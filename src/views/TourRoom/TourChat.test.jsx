import { render, screen } from "@testing-library/react";
import TourChat from "./TourChat";
import userEvent from "@testing-library/user-event";
import { createServer } from "http";
import { act } from "react-dom/test-utils";
const httpServer = createServer();

const io = require("socket.io")(httpServer, {
    cors: {
      origin: '*',
    }
  });

  

// afterAll(()=> {
//     httpServer.close()
// })

describe('Tour Chat Test', ()=> {
    Element.prototype.scrollIntoView = jest.fn();
    beforeAll(() => { // Jest will wait until `done` is called
        httpServer.listen('4000', () => {
            console.log('listening on 4000');
            io.on('connection', (socket) => {
                var tours = {
                    'mocked-tourname': {
                        tour_name: "mocked-tourname",
                        max_player: 20,
                        type: "Pairs",
                        password: "",
                        player_name: [
                            {
                                name: 'mocked-1',
                                status: 'waiting'
                            },
                            {
                                name: 'mocked-2',
                                status: 'waiting'
                            },
                        ],
                        time_start: "11/20/2021",
                        status: "Pending",
                        board_to_play: "5",
                        minute_board: "6",
                        board_round: "1",
                        movement: "mocked",
                        scoring: "mocked",
                        barometer: true,
                        createBy: "username",
                        player_pair :[],
                        player_waiting : []
                    }
                    
                }
    
                socket.emit('message', 'sampleMessage');
                
                socket.on('send-tour-chat', (sender, tour_name, message)=> {
                    // console.log("HE")
                    const newMessage = {
                      sender: sender,
                      message: message
                    }
                    io.emit('update-tour-chat', newMessage)
                  })
    
                socket.on('send-lobby-chat', (sender, message)=> {
                    const newMessage = {
                        sender: sender,
                        message: message
                    }
                    io.emit('update-lobby-chat', newMessage)
                })
    
                socket.on('getPlayerInTourRoom', (tour_name, callback)=> {
                    const waitingPlayer = tours['mocked-tourname'].player_name.filter(player => player.status == "waiting").map( player => player.name)
                    callback(waitingPlayer)
                })
    
                socket.on('getTourList', (callback)=> {
                    const tourList = []
                    for (const tour_name in tours) {
                        let tourData = {
                          host: "",
                          title: tours[tour_name].tour_name,
                          type: String(tours[tour_name].type),
                          players: String(tours[tour_name].player_name.length),
                        }
                        tourList.push(tourData)
                    }
                    callback(tourList)
                })
    
                socket.on("join-tour", async (player_name, tour_name, callback) => {
                    //Response that player joined room
                    // console.log(`username ${player_name} is join the ${tour_name} tour`);
                    //Add user to tour
                    try {
                      socket.join('mocked-tourname');
                
                    //   console.log(player_name, tours)
                
                    //   if (tours[tour_name].player_name.length < tours[tour_name].max_player && users[player_name].tour == undefined) {
                    //     tours[tour_name].player_name.push({
                    //       name: player_name,
                    //       status: "waiting"
                    //     })
                    //     // tours[tour_name].player_name.push(player_name)
                    //     users[player_name].tour = tour_name
                    //     tours[tour_name].player_waiting.push(player_name)
                        const waitingPlayer = tours['mocked-tourname'].player_name.filter(player => player.status == "waiting").map( player => player.name)
                        io.in('mocked-tourname').emit('update-player-waiting', waitingPlayer)
                        // updateTourList()
                        callback(true)
                    //   }
                    } catch (error) {
                      callback(false)
                    //   console.log("error");
                    //   console.log(error);
                    }
                    //Send response to client
                    socket.emit("join-tour", `${player_name} connected Server`);
                  });
    
                  socket.on("create-tour", async (tour_data, callback) => {
                    //   console.log("CALLBACK", )
                      callback(true, "Room created");
                  });
            });
            // done();
        });
    });

    test('Remove text in textfiled should hide send button', ()=> {
        render(<TourChat display={true} tourName={"#"} />)
        userEvent.type(screen.getAllByRole('textbox')[0], "hg{backspace}{backspace}")
        expect(screen.getAllByRole('textbox')[0]).toHaveValue("")
    })
    
    test('render', ()=> {
        render(<TourChat display={false} tourName={"#"} />)
    })

    test('Visible', ()=> {
        const { container } = render(<TourChat display={true} tourName={"#"} />)
        expect(container.firstChild).toBeVisible()
    })

    test('Send By Button', async ()=> {
        await act(async ()=> {
            screen.debug()
            render(<TourChat display={true} tourName={"#"} />)
            userEvent.type(screen.getAllByRole('textbox')[0], "hello")
            userEvent.click(screen.getAllByRole('button')[0])
        })
        expect(await screen.findByText('hello', {}, {timeout: 3000})).toBeInTheDocument()
    })

    test('Send By Enter', async ()=> {
        await act(async ()=> {
            screen.debug()
            render(<TourChat display={true} tourName={"#"} />)
            userEvent.type(screen.getAllByRole('textbox')[0], "hello {enter}")
        })
        expect(await screen.findByText('hello', {}, {timeout: 3000})).toBeInTheDocument()
    })

    test('Display Tournament Chat text', ()=> {
        const { container } = render(<TourChat display={true} tourName={"#"} />)
        expect(container).toHaveTextContent("Tournament Chat")
    })

})