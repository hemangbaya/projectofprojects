import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private router:Router, private ds:DataService, private route: ActivatedRoute) { }
  passString;
  email;
  password;
  ngOnInit(): void {
    this.route.queryParams.subscribe((par) => {
      this.passString=par.passString;
      this.email=par.user;
    })
  }
  newpass() {
    this.ds.getnewpassword({email: this.email, passString:this.passString, password:this.password}).subscribe((resp)=>{
      if (resp.status=="ok") {
        // alert(1);
        this.router.navigate(['/signin'], {queryParams: {message:"Sign in with you new password!", passchange:'true'}});
        alert("Password changed!");
      }
      else{
        alert("Link doesn't work anymore");
        this.router.navigate(['/']);
      }
      
    });
   
  }

}
