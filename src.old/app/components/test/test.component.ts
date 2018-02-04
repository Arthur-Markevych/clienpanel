import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  items: Observable<Client[]>;
  itemsCollection: AngularFirestoreCollection<Client>;
  snapshot:any;
  constructor(public efs: AngularFirestore) {
    
  }

  ngOnInit() {
    this.itemsCollection = this.efs.collection('clients');
    // this.items = this.itemsCollection.valueChanges();

    // this.snapshot = this.itemsCollection.snapshotChanges().map(arr => {
    //   console.log('=========>>', arr)
    //   return arr.map(snap => snap.payload.doc.data() )
    // })

    this.items = this.itemsCollection.snapshotChanges().map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    })   
    console.log('ngOnInit() test.component: ', this.items)
  }

}
