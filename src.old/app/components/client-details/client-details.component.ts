import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../sevices/client.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
FlashMessagesService

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
