import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-projectpage',
  templateUrl: './projectpage.component.html',
  styleUrls: ['./projectpage.component.css']
})
export class ProjectpageComponent implements OnInit {
  user;
  projname;
  projdescription;
  projgithublink;
  projhowtosetup;
  likes;
  comments;
  date;
  email;
  constructor(private route:ActivatedRoute, private ds:DataService, private router:Router) { }
  
  ngOnInit(): void {
    this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
      if (response.status == "ok") {
        this.email = response.data.email;

        this.route.queryParams.subscribe((par) => {
          this.ds.getproject({user:par.user, projname:par.projname}).subscribe((response)=>{
            if (response==null) {
              alert("not found");
            }
            this.user = response.email;
            this.projname=response.projname;
            this.projdescription=response.projdescription;
            this.projgithublink=response.projgithublink;
            this.projhowtosetup=response.projhowtosetup;
            this.likes=response.likes;
            this.date=response.date;
            this.comments=response.comments;
            
            this.ds.ifliked({email:this.email, user:this.user, proj:this.projname}).subscribe((data)=>{
              if (data.status=="liked") {
                // alert("red");
                document.getElementById('likeicon').style.backgroundColor='red';
              }
              if (data.status=="notliked") {
                // alert("gray");
                document.getElementById('likeicon').style.backgroundColor='gray';
              }
              // alert(JSON.stringify(data));
            })
          })
        })

      }
      else {
        this.router.navigate(['/signin'], { queryParams: { message: 'signinfirst'}});
      }
    });

    
    
    
  }

likeproject() {
  // this.ds.ifliked({email:this.email, likedemail:this.user, likedproj:this.projname}).subscribe((data)=>{
  //   if (data.status=="ok") {
      this.ds.likeproj({email:this.email, user:this.user, proj:this.projname}).subscribe((data)=>{
        if (data.status=="liked") {
          document.getElementById('likeicon').style.backgroundColor='red';
        }
        if (data.status=="unliked") {
          document.getElementById("likeicon").style.background="gray";
        }
      })
      // document.getElementById('likeicon').style.backgroundColor='red';
    }
    // else {
      // document.getElementById('likeicon').style.backgroundColor='gray';
    // }
  // })
// }
}



