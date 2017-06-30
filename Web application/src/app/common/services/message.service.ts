import { Injectable , } from '@angular/core';
import { Http } from '@angular/http';
import { messagesList , messagesShow,messageSend} from '../../api';
import { UserService } from './user.service';
import { Message } from '../models/message';
import { MessageList } from '../models/messageList';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
    private messageListAvailableSource = new Subject();
    messageListAvailable$ = this.messageListAvailableSource.asObservable();

    constructor(private http: Http, private userService: UserService) { }

    getAllMessageLists(callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.get(messagesList, {headers: headers})
            .toPromise()
            .then((response) => {
                const messageListArray = new Array<MessageList>();
                response.json().forEach((messageList) => {
                    const mesList = new MessageList();
                    mesList.receiverId = messageList.receiverId;
                    mesList.senderId = messageList.senderId;
                    mesList.date = messageList.date;
                    mesList.ad.adId= messageList.ad.adId;
                    mesList.ad.subject = messageList.ad.subject;
                    mesList.user.userId = messageList.user.userId;
                    mesList.user.firstName = messageList.user.firstName;
                    mesList.user.lastName = messageList.user.lastName;
                    mesList.lastMessage.user.userId = messageList.lastMessage.user.userId;
                    mesList.lastMessage.content = messageList.lastMessage.content;
                    
                    messageListArray.push(mesList);
                });

                callback(null, messageListArray);
            })
            .catch((errors) => {
                callback(errors, null);
            });
    }



}