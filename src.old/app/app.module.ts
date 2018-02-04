import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

//AngularFire imports
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireDatabase } from 'angularfire2/database'; 
import { AngularFireAuth } from 'angularfire2/auth'; 

//Component imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// Services imports
import { ClientService } from './sevices/client.service';
import { TestComponent } from './components/test/test.component';

// ======== trying =============
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


export const firebaseConfig = {
  apiKey: "AIzaSyAxANAm4fUNhFrBOenVQfjx_ozca__WaSc",
    authDomain: "clientpanel-test-app.firebaseapp.com",
    databaseURL: "https://clientpanel-test-app.firebaseio.com",
    projectId: "clientpanel-test-app",
    storageBucket: "clientpanel-test-app.appspot.com",
    messagingSenderId: "618884543408"
  }

const appRoutes:Routes = [
  {path:'', component:DashboardComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'add-client', component:AddClientComponent},
  {path:'client/:id', component:ClientDetailsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule.forRoot(),
    //=======================================
    // AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
