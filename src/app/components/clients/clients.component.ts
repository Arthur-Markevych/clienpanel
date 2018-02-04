import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../sevices/client.service';
import { Client } from '../../models/Client';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:Observable<Client[]>;
  totalOwed:number;
  constructor(
    public clientService:ClientService
  ) {   

   }

  ngOnInit() {

    this.clients = this.clientService.clientsCollection.snapshotChanges().map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    });  

    console.log('this.client onInit()', this.clients)
    
    
    this.getTotalOwed();
  }

  deleteClient(event, client:Client){
    this.clientService.deleteClient(client);
  }

  getTotalOwed(){
    this.clients.forEach(client => {
      let total = 0;
      for(let i = 0; i < client.length; i++){
        total += parseFloat(client[i].balance.toString()); 
        }
        this.totalOwed = total;
    });
  }

  getClients(value?:string){
    if(value == undefined) value = null;
    console.log(value); 
    this.clients = this.orderBy(value).snapshotChanges().map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    })
  }

  orderBy(value?:string){
    return this.clientService.orderByCollection(value);
  }

}
