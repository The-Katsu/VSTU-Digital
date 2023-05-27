import {HubConnectionBuilder} from '@microsoft/signalr';
import {API_URL, WS_URL} from "../../config";
import AuthService from "./AuthService";



class ChatService {
    constructor() {
        this.connection = null;
    }

    initializeConnection() {
        this.connection = new HubConnectionBuilder()
            .withUrl(`${WS_URL}/chatHub`)
            .build();
    }

    async startConnection(chatId) {
        const negotiationRequest = { protocol: 'json', version: 1 };
        this.connection
            .invoke('negotiate', negotiationRequest)
            .then(response => console.log('Negotiation response:', response))
            .catch(error => console.log('Error negotiating:', error));

        this.subscribeToIncomingMessages();

        return this.connection.start().then(() => this.connection.invoke('JoinChat', chatId.toString()));
    }

    subscribeToIncomingMessages(handleIncomingMessage) {
        if (this.connection) {
            this.connection.on('Send', handleIncomingMessage);
        }
    }

    unsubscribeFromIncomingMessages(){
        if (this.connection) {}
        this.connection.stop();
    }

    sendMessageToSignalR(message) {
        if (this.connection && message) {
            this.connection.invoke('SendMessage', message)
                .catch((err) => console.log('Error sending message to SignalR: ', err));
        }
    }

    async sendMessageToAPI(chatId, message) {
        try {
            const req = JSON.stringify({
                chatId: chatId,
                message: message
            });
            console.log(req);
            const authService = new AuthService();
            const token = await authService.getToken();
            const response = await fetch(`${API_URL}/Messages/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    chatId: chatId,
                    message: message
                })
            });

            if (!response.ok) {
                throw new Error('Error sending message to API');
            }

            console.log('Message sent to API successfully');
        } catch (err) {
            console.log('Error sending message to API:', err);
        }
    }
}

export default ChatService;
