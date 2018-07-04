import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPassword('password', 'confirm') })
  }

  validateEmail(controls) {
    var regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return {'validateEmail': true}
    }
  }

  validateUsername(controls) {
    var regExp = new RegExp(/^[a-z0-9]+$/);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return {'validateUsername': true}
    }
  }

  validatePassword(controls) {
    var regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{6,16}$/);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return {'validatePassword': true}
    }
  }

  matchingPassword(password, confirm) {
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return {'matchingPassword': true}
      }
    }
  }

  onRegisterSubmit() {
    console.log(this.form.value);
  }

}
