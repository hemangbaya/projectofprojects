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
  user;
  projname;
  forgotemail: any;
  constructor(private router:Router, private ds:DataService, private route: ActivatedRoute) { }
  message:string;
  ngOnInit(): void {
    // alert(this.ds.test);
    // alert(JSON.parse(localStorage.getItem('accessString')));
    this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
      if (response.status == "ok") {
        alert("Already logged in");
        this.router.navigate(['/']);
      }
      else {
        if (localStorage.getItem('accessString')!=undefined || localStorage.getItem('accessString').length!=1) {

        }
      }
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
        this.user=par.user;
        this.projname=par.projname;
        document.getElementById('fromwhere').innerHTML = this.message;
        if (par.passchange!='true') {
          if (localStorage.getItem("accessString").length==20 && response.status!="ok") {
            alert('It seems like you signed in somewhere else. If it wasn\'t you, please change your password');
          }
        }
      })
    });
    
  }

    signInAction() {
      document.getElementById('emailpasswordsuggestion').innerHTML = "";
        this.ds.signIn({email:this.emailofuser.toLowerCase(), password:this.passwordofuser})
        .subscribe((response)=>{
          if(response.status=="ok") {
            localStorage.setItem('accessString', response.data);
            if (this.projname==undefined && this.user==undefined) {
              this.router.navigate(['/']);
            }
            else {
              this.router.navigate(['/projectpage'], {queryParams: {user:this.user, projname:this.projname}})
            }
            
          }
          else {
            document.getElementById('emailpasswordsuggestion').innerHTML = "Email/password not valid";
          }
        })
    }

    changepassword(){
      // alert(this.forgotemail);
      this.ds.changepassword({email:this.forgotemail}).subscribe((response)=>{
        document.getElementById('emailsent').style.display='block';
      })
      document.getElementById("forgotpassword").style.display="none";
      document.getElementById("emailsent").style.display="block";
    }
    forgotactivate(){
      document.getElementById("forgotpassword").style.display="block";
    }
}
