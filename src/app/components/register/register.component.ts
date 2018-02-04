import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router } from '@angular/router';
import { AuthService } from '../../sevices/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string;
  password:string;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessageService:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.register(this.email, this.password).then((res) => {
      this.flashMessageService.show('New user regitred', {cssClass:'alert-success', tomeout:4000});
      this.router.navigate(['/'])
    }).catch((err) => {
      this.flashMessageService.show(err , {cssClass:'alert-alert', tomeout:4000});
      this.router.navigate(['/register'])
    })
  }


}
