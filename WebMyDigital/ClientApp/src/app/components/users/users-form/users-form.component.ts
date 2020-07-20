import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this.initForm();
    this.setDataForm();
  }

  initForm() {
    this.form = this.fb.group({
      Name: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[0-9A-Za-zñÑáéíóúÁÉÍÓÚ# ]*$')]],
      LastName: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[0-9A-Za-zñÑáéíóúÁÉÍÓÚ# ]*$')]],
      Dni: ['', [Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[0-9]*$')]],
      NetworkUser: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[0-9A-Za-zñÑáéíóúÁÉÍÓÚ# ]*$')]],
      Email: ['', [Validators.email]],
      BirthDate: ['', [Validators.required]],
      LowDate: ['', [Validators.required]]
    });
  }

  setDataForm() {
    this._userService.editUsers$.subscribe((tmpData: User) => {
      this.form.setValue({
        Name: tmpData.Name,
        LastName: tmpData.LastName,
        Dni: tmpData.Dni,
        NetworkUser: tmpData.NetworkUser,
        Email: tmpData.Email,
        BirthDate: (new Date(tmpData.BirthDate)).toISOString().substring(0, 10),
        LowDate: (new Date(tmpData.LowDate)).toISOString().substring(0, 10),
      });
    })
  }

  cleanForm() {
    this.form.setValue({
      Name: '',
      LastName: '',
      Dni: '',
      NetworkUser: '',
      Email: '',
      BirthDate: '',
      LowDate: '',
    });
  }

  sendForm() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
    let user: User = Object.assign({}, this.form.value);
    this._userService.saveUser(user)
      .subscribe(resp => { });
  }
}
