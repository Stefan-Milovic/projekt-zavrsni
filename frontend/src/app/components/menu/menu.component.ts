import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/services/User.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  //              html
  constructor(public userService: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.toastrService.info('Successfully logged out');
  }
}
