import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
// import { signedInStatus } from '../app.component';
// import { LogoutserviceService } from '../logoutservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  emailofuser;
  passwordofuser;
  constructor(private router:Router, private ds:DataService, private route: ActivatedRoute) { }
  message:string;
  ngOnInit(): void {
    // alert(this.ds.test);
    // alert(JSON.parse(localStorage.getItem('accessString')));
    this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
      if (response.status == "ok") {
        alert("You are already logged in!");
        this.router.navigate(['/']);
      }
    });
    this.route.queryParams.subscribe((par) => {
      this.message = par.message;
      if (this.message == undefined) {
        this.message ="";
      }
      if(this.message == "signinfirst") {
        this.message = "Please sign in first";
      }
      if(this.message == "accountmade") {
        this.message = "Account created!"
      }
      document.getElementById('fromwhere').innerHTML = this.message;
    })
    
  }

    signInAction() {
      document.getElementById('emailpasswordsuggestion').innerHTML = "";
      if (this.emailofuser != null || this.passwordofuser != null) {
        this.ds.signIn({email:this.emailofuser.toLowerCase(), password:this.passwordofuser})
        .subscribe((response)=>{
          if(response.status=="ok") {
            localStorage.setItem('accessString', response.data);
            this.router.navigate(['/']);
          }
          else {
            document.getElementById('emailpasswordsuggestion').innerHTML = "Email/password not valid or some error occured";
          }
        })
      }
      else {
        document.getElementById('emailpasswordsuggestion').innerHTML = "Email/password not valid or some error occured";
      }
    }
}
