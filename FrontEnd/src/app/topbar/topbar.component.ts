import { Component, OnInit } from '@angular/core';
// import { signedInStatus } from '../app.component';
import { Router } from '@angular/router';
// import { LogoutserviceService } from '../logoutservice.service';
import { DataService} from '../data.service'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})

export class TopbarComponent implements OnInit {

  constructor(private router:Router, private ds:DataService) { }
 name;
  ngOnInit(): void {
    this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
      var x = document.getElementById("signinsignup");
      var y = document.getElementById("profilepicturelogoutbutton");
      if (response.status == "ok") {
        this.name = response.data.name;
        x.style.display = "none";
        y.style.display = "block";
      }
      else {
        x.style.display = "block";
        y.style.display = "none";
      }
    });
}

  // topbarlogoutcommand:boolean = false;
  logout() {
    localStorage.setItem("accessString","a")
    window.location.reload(); 
    this.router.navigate(['/']);
  }

} 
