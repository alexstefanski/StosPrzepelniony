import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../common/services/action.service';
import { Action } from '../../common/models/action';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  actionsList: Array<Action> = new Array<Action>();
  constructor(private actionService: ActionService) { }

  ngOnInit() {
    this.actionService.getAllActions((errors, actionsArray) => {
      if (errors === null){
        this.actionsList = actionsArray;
      } else {
        console.log(errors);
      }
    });
  }

}
