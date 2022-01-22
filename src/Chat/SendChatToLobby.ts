import { socket } from "../Service/SocketService"
import { SendChatUseCaseProtocol } from "./SendChat"

class SendChatToLobbyUseCase implements SendChatUseCaseProtocol {
    command: string
    sender: string
    execute(message: string) {
        socket.emit(this.command, this.sender, message, ()=> {
            
        })
    }
    
    constructor(command: string, sender: string) {
        this.command = command
        this.sender = sender
    }
}

export default SendChatToLobbyUseCase;