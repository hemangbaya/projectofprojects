import { Component, OnInit } from '@angular/core';
// import { signedInStatus } from '../app.component';
import { Router } from '@angular/router';
// import { LogoutserviceService } from '../logoutservice.service';
import { DataService} from '../data.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})

export class TopbarComponent implements OnInit {

  constructor(private router:Router, private ds:DataService, private http:HttpClient) { }
 name;
 email;
  ngOnInit(): void {
    // localStorage.removeItem("accessString");
    if (localStorage.getItem("accessString") == undefined) {
      localStorage.setItem("accessString","a");
    }
    this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
      var x = document.getElementById("signinsignup");
      var y = document.getElementById("profilepicturelogoutbutton");
      if (response.status == "ok") {
        this.name = response.data.name;
        this.email = response.data.email;
        x.style.display = "none";
        y.style.display = "block";
      }
      else {
        x.style.display = "block";
        y.style.display = "none";
      }
    });
    this.getapi();
}

  // topbarlogoutcommand:boolean = false;
  
  getapi() {
    this.http.get<any>('https://api.covid19api.com/summary').subscribe((d)=>{
      // alert(JSON.stringify(d));
      var cont = 'Covid-19 Update<br>Confirmed-';
      cont+=String(d.Global.TotalConfirmed)+'<br>Deaths-';
      cont+=String(d.Global.TotalDeaths)+'<br>Recovered-';
      cont+=String(d.Global.TotalRecovered)+'<br>'
      document.getElementById('api').innerHTML = cont;
    })
  }
} 
