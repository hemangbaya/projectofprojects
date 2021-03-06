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
        alert("Please logout of the current account to make a new account.");
        this.router.navigate(['/']);
      }
    });
  }
  imgtext;
  signUpAction() {
    var formStatus:number = 1;
    document.getElementById('namesuggestion').innerHTML = '';
    document.getElementById('emailsuggestion').innerHTML = '';
    document.getElementById('passwordsuggestion').innerHTML = '';
    document.getElementById('confpasswordsuggestion').innerHTML = '';

      if (this.nameofuser == '' || this.nameofuser == null) {
        document.getElementById('namesuggestion').innerHTML = '<div style="color:red;">Enter Name</div>';
        formStatus = 0;
      }

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.emailofuser) || this.emailofuser == null) {
        document.getElementById('emailsuggestion').innerHTML = '<div style="color:red;">Invalid Email Id</div>';
        formStatus = 0;
      }

      if (!/^.{6,}$/.test(this.passwordofuser) || this.passwordofuser == null) {
        document.getElementById('passwordsuggestion').innerHTML = '<div style="color:red;">Password must contain 6 characters</div>';
        formStatus = 0;
      }

      if (this.passwordofuserconf != this.passwordofuser || this.passwordofuserconf== null) {
        document.getElementById('confpasswordsuggestion').innerHTML = '<div style="color:red;">Passwords don\'t match</div>';
        formStatus = 0;
      }
    
    document.getElementById('alreadyexists').innerHTML = " ";
    if (formStatus == 1) {
      this.ds.signUp(
        {name:this.nameofuser, email:this.emailofuser.toLowerCase(), password: this.passwordofuser})
        .subscribe((response) => {
          if (response.status == "ok") {
            this.router.navigate(['/signin'], { queryParams: { message: 'accountmade'}});
          }
          else {
            document.getElementById('alreadyexists').innerHTML = 'Account already exists. Now just sign in!'
          }
        });
    }
  }
  
  profpic(eve) {
    this.imgtext = eve.target.value;
    document.getElementById("changingimage").setAttribute('src', "https://robohash.org/"+this.imgtext); 
  }
}
        