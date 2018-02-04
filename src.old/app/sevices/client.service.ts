import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Client } from '../models/Client';  

@Injectable()
export class ClientService {

  clients: Observable<Client[]>;
  clientsCollection: AngularFirestoreCollection<Client>;
  snapshot:any;

  constructor(public efs: AngularFirestore) {

    this.clientsCollection = this.efs.collection('clients');

    this.clients = this.clientsCollection.snapshotChanges().map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    })

    // console.log('ngOnInit() clint.service:',this.clients)

    // console.log('from clint.service constructor:',this.clients)

    // this.snapshot = this.clientsCollection.snapshotChanges().map(arr => {
    //   console.log('=========>>', arr)
    //   return arr.map(snap => snap.payload.doc.data() )
    // })

    
  }


  getClients(){
    return this.clients
  }

}
