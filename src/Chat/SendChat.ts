import { socket } from "../Service/SocketService"

export interface SendChatUseCaseProtocol {
    execute(message: string): void
}

class SendChatUseCase implements SendChatUseCaseProtocol {
    command: string
    sender: string
    tourName: string
    execute(message: string) {
        socket.emit(this.command, this.sender, this.tourName, message, ()=> {
            
        })
    }
    
    constructor(command: string, sender: string, tourName: string,) {
        this.command = command
        this.sender = sender
        this.tourName = tourName
    }
}

export default SendChatUseCase;