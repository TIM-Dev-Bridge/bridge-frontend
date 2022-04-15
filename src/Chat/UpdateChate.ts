import { socket } from "../Service/SocketService"

interface ChatObj {
    sender: string,
    message: string
}

interface UpdateChatProtocol {
    execute(callback: (message: ChatObj)=>void): void
}

class UpdateChatUseCase implements UpdateChatProtocol {
    command: string
    execute(callback: (message: ChatObj) => void): void {
        socket.on(this.command, (message: ChatObj)=> {
            callback(message)
        })
    }

    constructor(command: string) {
        this.command = command
    }
}

export default UpdateChatUseCase;
