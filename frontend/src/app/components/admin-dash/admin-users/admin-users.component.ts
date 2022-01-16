import { UserService } from './../../../shared/services/User.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsServiceService } from './../../../shared/services/products-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  changedUser = { id: '', username: '', email: '', firstName: '', lastName: '', role: '', address: '', status: '' }
  users: any = [];

  constructor(private UserService: UserService,
    private notification: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {

    this.UserService.getUsers().subscribe(response => {
      console.log(response);

      this.users = response;
    });
  }


  deleteUser(id: number) {
    console.log(id);
    this.UserService.deleteUser(id).subscribe((response: any) => {
      this.getUsers()
      this.notification.success(response.msg)
    })

  }
  editUser(item: any) {
    this.changedUser = { ...item };
    console.log(item);


  }
  updateUser() {
    console.log('changed user in the comp', this.changedUser);

    this.UserService.updateUser(this.changedUser.id, this.changedUser).subscribe((response: any) => {
      this.getUsers()
      this.notification.success(response.msg)
    })
  }

  banUser(id: any) {
    this.UserService.banUser(id).subscribe((res: any) => {
      this.getUsers()
      this.notification.success(res.msg)
    })
  }
}
