import SendChatUseCase, { SendChatUseCaseProtocol } from "./SendChat";
import SendChatToLobbyUseCase from "./SendChatToLobby";
import UpdateChatUseCase from "./UpdateChate";

interface ChatChanelCommand {
    send: string,
    update: string
}

export enum ChatChanelType {
    tour,
    lobby
}

export const ChatChanel =(chanel: ChatChanelType)=> {
    switch (chanel) {
        case ChatChanelType.tour : return {send: "send-tour-chat", update: "update-tour-chat"}
        case ChatChanelType.lobby : return {send: "send-lobby-chat", update: "update-lobby-chat"}
    }
}

export class ChatUseCase {
    chanel: ChatChanelType
    public getSendMessageUseCase(sender: string, tourName: string): SendChatUseCaseProtocol {
        return new SendChatUseCase(ChatChanel(this.chanel).send,sender, tourName)
    }

    public getSendMessageToLobbyUseCase(sender: string): SendChatUseCaseProtocol {
        return new SendChatToLobbyUseCase(ChatChanel(this.chanel).send, sender)
    }

    public getUpdateMessageUseCase(): UpdateChatUseCase {
        return new UpdateChatUseCase(ChatChanel(this.chanel).update)
    }

    constructor(chanel: ChatChanelType) {
        this.chanel = chanel
    }
}
