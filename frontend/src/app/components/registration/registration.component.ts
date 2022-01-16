import { UserService } from './../../shared/services/User.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../profile/User.model';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: User = new User();


  constructor(
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('login');
  }
  saveUser() {
    //console.log(this.user);
    this.userService.registerUser(this.user).subscribe(response => {
      console.log(response);
      this.toastrService.success('Successfully registred on our page');
      this.login();
    })

  }
}
