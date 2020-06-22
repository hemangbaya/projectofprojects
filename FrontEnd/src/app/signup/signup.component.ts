import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient,HttpParams } from '@angular/common/http';
// import { LogoutserviceService } from '../logoutservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  nameofuser;
  emailofuser;
  passwordofuser;
  passwordofuserconf;
  constructor(private ds:DataService, private router:Router) { }

  ngOnInit(): void {
    // this.ds.test = 2;
    this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
      if (response.status == "ok") {
        this.ds.loginstat = true;
      }
      else {
        this.ds.loginstat = false;
      }
    });
    setTimeout(() => {
      if (this.ds.loginstat == true) {
        alert("Please logout of the current account to make a new account.");
        this.router.navigate(['/']);
      }
    }, 1000);
    
  }

  signUpAction() {
    var formStatus:number = 1;

      if (this.nameofuser == '' || this.nameofuser == null) {
        document.getElementById('namesuggestion').innerHTML = 'Enter Name';
        formStatus = 0;
      }
      else {
        document.getElementById('namesuggestion').innerHTML = '';
      }

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.emailofuser) || this.emailofuser == null) {
        document.getElementById('emailsuggestion').innerHTML = 'Invalid Email Id';
        formStatus = 0;
      }
      else {
        document.getElementById('emailsuggestion').innerHTML = '';
      }

      if (!/^.{6,}$/.test(this.passwordofuser) || this.passwordofuser == null) {
        document.getElementById('passwordsuggestion').innerHTML = 'Password must contain 6 characters';
        formStatus = 0;
      }
      else {
        document.getElementById('passwordsuggestion').innerHTML = '';
      }

      if (this.passwordofuserconf != this.passwordofuser || this.passwordofuserconf== null) {
        document.getElementById('confpasswordsuggestion').innerHTML = 'Passwords don\'t match';
        formStatus = 0;
      }
      else {
        document.getElementById('confpasswordsuggestion').innerHTML = '';
      }
    
    document.getElementById('alreadyexists').innerHTML = " ";
    if (formStatus == 1) {
      this.ds.signUp(
        {name:this.nameofuser.toLowerCase(), email:this.emailofuser.toLowerCase(), password: this.passwordofuser})
        .subscribe((response) => {
          if (response.status == "ok") {
            this.router.navigate(['/signin'], { queryParams: { accountmade: 'true'}});
          }
          else {
            document.getElementById('alreadyexists').innerHTML = 'Account already exists or some error occured.'
          }
        });
    }
  }
}
        