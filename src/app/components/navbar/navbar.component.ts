import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../sevices/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';
import { SettingsService } from '../../sevices/settings.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;

  constructor(
    private authService:AuthService,
    private flashMessageService:FlashMessagesService,
    private router:Router,
    private settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
      this.showRegister = this.settingsService.getSettings().allowRegistration;
    });
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessageService.show('You are logged out', {cssClass:'alert-success', timeout:4000});
    this.router.navigate(['/login']);
  }

}
