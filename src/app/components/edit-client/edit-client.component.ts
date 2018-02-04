import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../sevices/client.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../sevices/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id:string;
  client:Client = {
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }

  disableBalanceOnEdit:boolean = true;

  constructor(
    public clientService:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // GET Client
    this.clientService.getClient(this.id).snapshotChanges().subscribe(changes => {
      const data = changes.payload.data() as Client;
      const id = changes.payload.id;
      this.client = {id, ...data};      
    });

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}:{value:Client, valid:boolean}){
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 4000});
      this.router.navigate([`/edit-client/${this.id}`]);
    }else{
      //Update Client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client updated', {cssClass:'alert-success', timeout: 4000});
      this.router.navigate([`/client/${this.id}`]);
    }
  }

}
