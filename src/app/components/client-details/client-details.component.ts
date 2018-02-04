import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../sevices/client.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { Observable } from 'rxjs/observable';
import { timeout } from 'q';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(
    public clientService:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).snapshotChanges().subscribe(changes => {
      const data = changes.payload.data() as Client;
      const id = changes.payload.id;
      if(data.balance > 0) this.hasBalance = true;
      this.client = {id, ...data};      
    });
  }

  updateBalance(id:string){
    this.clientService.updateClient(id, this.client);
    this.flashMessagesService.show('Balance updaed', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate([`/client/${this.client.id}`]);
  }

  onDeleteClick(){
    if(confirm("Are you sure to delete?")){
      this.clientService.deleteClient(this.client);
      this.flashMessagesService.show('Client deleted', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(["/"]);
    }
  }
}
