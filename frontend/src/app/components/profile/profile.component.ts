import { UserService } from './../../shared/services/User.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any = { email: '', firstName: '', lastName: '', address: '' }
  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('loggedUser')
    if (user) {
      this.currentUser = JSON.parse(user)
    }
  }

}
