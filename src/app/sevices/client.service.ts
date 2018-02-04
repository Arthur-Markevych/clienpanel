import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Client } from '../models/Client';  
import { element } from 'protractor';

@Injectable()
export class ClientService {

  clients: Observable<Client[]>;
  client: Observable<Client>;
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc:AngularFirestoreDocument<Client>
  snapshot:any;
  docId:any;
  orderByValue:string = "firstName"
  constructor(public afs: AngularFirestore) {

    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy(this.orderByValue, 'asc'));

  }

  

  newClient(client:Client){
    this.clientsCollection.add(client);
  }

  getClients(){
    return this.clients;
  }

  getClient(id:string){
    return this.afs.doc<Client>(`clients/${id}`);
  }

  updateClient(id:string, client:Client){
      this.getClient(id).update(client);
  }

  deleteClient(client:Client){
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }

  getClientCollection(){
    return this.clientsCollection;
  }

  orderByCollection(orderBy?:string){
    if(orderBy != null){
    console.log('oredrBy()', orderBy);
    return this.afs.collection('clients', ref => ref.orderBy(orderBy, 'asc'));
    } else {
      return this.getClientCollection();
    }
  }

}
