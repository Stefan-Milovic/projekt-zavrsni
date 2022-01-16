import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/components/profile/User.model';
import { UserService } from './../../shared/services/User.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private router: Router, private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
  };

  signUp() {
    this.router.navigateByUrl('registration');
  }
  login() {
    this.userService.loginUser(this.email, this.password).subscribe((response: any) => {
      if (response.hasOwnProperty('error')) {
        this.toastrService.error(response.error);
        return
      }

      if (!response.id) { this.toastrService.info('Wrong informations') }
      else {
        delete response.password;
        this.toastrService.success('Succesfully logged in');
        localStorage.setItem('loggedUser', JSON.stringify(response))
        this.router.navigateByUrl('home');
      }
    });

  };
};
