import { Component, OnInit } from '@angular/core';
import { Message } from '../common/models/message';
import { MessageList } from '../common/models/messageList';
import { MessageService } from '../common/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messageListArray: Array<MessageList>;

  constructor(private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.showMessageList();
    this.messageService.messageListAvailable$.subscribe(
        () => this.showMessageList()
    );
  }
  showMessageList() {
    this.messageService.getAllMessageLists((errors, messageLists) => {
      if (!errors) {
        this.messageListArray = messageLists;
      }
    })
  }
}
