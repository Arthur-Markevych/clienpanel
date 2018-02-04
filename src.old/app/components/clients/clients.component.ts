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
  ) {    }

  ngOnInit() {
    this.clients = this.clientService.getClients();
    this.getTotalOwed();
    // console.log('ngOnInit() clients.component: ', this.clients)
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

}
