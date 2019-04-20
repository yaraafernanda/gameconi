import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkUsername } from 'src/app/validators/check-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formSignUp:FormGroup;
  constructor() { }

  ngOnInit() {
    this.formSignUp = new FormGroup({
      username: new FormControl('',[Validators.required,checkUsername]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      terms: new FormControl('',[Validators.required])
    });
  }

}
