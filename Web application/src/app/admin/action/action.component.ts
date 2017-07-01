import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../common/services/action.service';
import { Action } from '../../common/models/action';
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class AdminActionComponent implements OnInit {
  p: number = 1;
  actionsList: Array<Action> = new Array<Action>();
  messages: string = '';
  constructor(private actionService: ActionService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.actionService.getAllActions((errors, actionsArray) => {
      if (errors === null){
        this.actionsList = actionsArray;
      } else {
        this.actionsList = null;
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
          this.messages = errors.json().messages;
        }
      }
    });
  }

}
