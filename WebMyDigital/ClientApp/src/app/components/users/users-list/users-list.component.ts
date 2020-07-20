import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MESSAGE } from 'src/app/config/constants/message.constant';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  data: User[];

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this.refreshData();
    this.getUserList();
  }

  refreshData() {
    this._userService.dataUsers$.subscribe((tmpData) => {
      this.data = tmpData
    })
  }

  getUserList() {
    this._userService.getUserList();
  }

  onRowDelete(event: any) {
    Swal.fire({
      title: MESSAGE.important,
      text: MESSAGE.deleteMsj,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this._userService.deleteUser(event).subscribe();
      }
    });
  }

  onRowEdit(event: any) {
    this._userService.editUsers$.emit(event);
  }

}
