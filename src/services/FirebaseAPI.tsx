import axios from 'axios';
import { MessageType } from '../App';
import { API_MESSAGES } from '../config';

export default class FirebaseService {

    static getMessages(): Promise<MessageType[]> {
        return axios
        .get(API_MESSAGES)
        .then(response => response.data)
        .catch(error => this.handleError(error));
    }

    static postMessage(message: object): Promise<object> {
        return axios
        .post(API_MESSAGES, {
        ...message,
        })
        .then(response => response.data)
        .catch(error => this.handleError(error))
    }

    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error):void {
        console.error(error)
    }

}