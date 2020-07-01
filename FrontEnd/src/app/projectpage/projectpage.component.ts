import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import * as fileSaver from 'file-saver'

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
  commentinput;
  allcomments;
  usersname;
  
  imgarr:Array<number>;
  constructor(private route:ActivatedRoute, private ds:DataService, private router:Router) { }
  @ViewChild('a') imga;
  @ViewChild('b') imgb;
  @ViewChild('c') imgc;
  @ViewChild('d') imgd;
  @ViewChild('e') imge;
  ngOnInit(): void {
    this.route.queryParams.subscribe((par) => {
      if (par.projname==undefined || par.user==undefined) {
        this.router.navigate(['/'])
      }
    this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
      if (response.status == "ok") {
        this.email = response.data.email;
        // alert(this.email);
        if (par.user==this.email) {
          document.getElementById("del").style.display="block";
        }
          // alert(par.projname);
          this.ds.getproject({email:par.user, projname:par.projname}).subscribe((resp)=>{
            if (resp.status=="failed") {
              alert("not found");
              this.router.navigate(['/']);
            }
            
            this.imgarr=[];
            for (var y=0; y<resp.imgcnt; y++) {
              this.imgarr.push(y);
            }

            if (this.imgarr[0]!=undefined){
              this.ds.getimage({email:par.user, projname: par.projname, no:1}).subscribe((dat)=>{
                
                var arrayBufferView = new Uint8Array( dat.data.data);
                var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                // fileSaver.saveAs(blob, 'a.jpg')
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL( blob );
                // alert(imageUrl)
                // this.content+=`<img src="${imageUrl}" alt="no image>`;
                  this.imga.nativeElement.src=imageUrl;
                  
              });}
              if (this.imgarr[1]!=undefined){
                this.ds.getimage({email:par.user, projname: par.projname, no:2}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgb.nativeElement.src=imageUrl;
                    
                });}
                if (this.imgarr[2]!=undefined){
                  this.ds.getimage({email:par.user, projname: par.projname, no:3}).subscribe((dat)=>{
                    
                    var arrayBufferView = new Uint8Array( dat.data.data);
                    var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                    // fileSaver.saveAs(blob, 'a.jpg')
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL( blob );
                    // alert(imageUrl)
                    // this.content+=`<img src="${imageUrl}" alt="no image>`;
                      this.imgc.nativeElement.src=imageUrl;
                      
                  });}
                  if (this.imgarr[3]!=undefined){
                    this.ds.getimage({email:par.user, projname: par.projname, no:4}).subscribe((dat)=>{
                      
                      var arrayBufferView = new Uint8Array( dat.data.data);
                      var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                      // fileSaver.saveAs(blob, 'a.jpg')
                      var urlCreator = window.URL || window.webkitURL;
                      var imageUrl = urlCreator.createObjectURL( blob );
                      // alert(imageUrl)
                      // this.content+=`<img src="${imageUrl}" alt="no image>`;
                        this.imgd.nativeElement.src=imageUrl;
                        
                    });}
                    if (this.imgarr[4]!=undefined){
                      this.ds.getimage({email:par.user, projname: par.projname, no:5}).subscribe((dat)=>{
                        
                        var arrayBufferView = new Uint8Array( dat.data.data);
                        var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                        // fileSaver.saveAs(blob, 'a.jpg')
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL( blob );
                        // alert(imageUrl)
                        // this.content+=`<img src="${imageUrl}" alt="no image>`;
                          this.imge.nativeElement.src=imageUrl;
                          
                      });}
            // alert(this.imgarr);
            this.user = resp.email;
            this.projname=resp.projname;
            this.projdescription=resp.projdescription;
            this.projgithublink=resp.projgithublink;
            this.projhowtosetup=resp.projhowtosetup;
            this.likes=resp.likes;
            this.date=resp.date;
            this.comments=resp.comments;
            this.usersname=resp.name;

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

            this.allcomments='';
            this.comments.forEach(element => {
              this.allcomments+=`<a href="/profilepage?user=${element.slice(0, element.indexOf('/'))}">${element.slice(0, element.indexOf('/'))}</a>${element.slice(element.indexOf('/'),)}<br>`
            });
            // document.getElementById("comments").innerHTML=this.allcomments;
            var commentdiv = document.getElementById("comments")
            commentdiv.innerHTML=this.allcomments;
            commentdiv.scrollTop = commentdiv.scrollHeight;
          })
        
      }
      else {
        this.router.navigate(['/signin'], { queryParams: { message: 'signinfirst', user:par.user, projname:par.projname}});
      }
    });
   
  })
    
    
  }

  likeproject() {
  // this.ds.ifliked({email:this.email, likedemail:this.user, likedproj:this.projname}).subscribe((data)=>{
  //   if (data.status=="ok") {
      this.ds.likeproj({email:this.email, user:this.user, proj:this.projname}).subscribe((data)=>{
        
        var nooflikes = parseInt(document.getElementById("like").innerHTML);
        var lk=0;
        if (data.status=="liked") {
          lk=1;
          // alert(nooflikes)
          document.getElementById('likeicon').style.backgroundColor='red';
        }
        if (data.status=="unliked") {
          document.getElementById("likeicon").style.background="gray";
          lk=-1;
        }
        nooflikes=nooflikes+lk;
        document.getElementById('like').innerHTML=String(nooflikes);
    })
      
      // document.getElementById('likeicon').style.backgroundColor='red';
  }
    // else {
      // document.getElementById('likeicon').style.backgroundColor='gray';
    // }
  // })
// }
  sendcomment() {
    var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date+' '+time;
        var comment = (<HTMLInputElement>document.getElementById("commentinput")).value;
        if (comment!='' && comment!=undefined) {
            comment = this.email+'/'+dateTime+'>> '+ (<HTMLInputElement>document.getElementById("commentinput")).value;
            this.ds.getcomment({email:this.user, projname:this.projname, comment:comment}).subscribe((data)=>{
              if (data.status=="got") {
                // this.comments=this.comments+comment;
                (<HTMLInputElement>document.getElementById("commentinput")).value='';
                
                this.allcomments+=`<a href="/profilepage?user=${comment.slice(0, comment.indexOf('/'))}">${comment.slice(0, comment.indexOf('/'))}</a>${comment.slice(comment.indexOf('/'),)}<br>`
                var commentdiv = document.getElementById("comments")
                commentdiv.innerHTML=this.allcomments;
                commentdiv.scrollTop = commentdiv.scrollHeight;
                // alert(comment);
              }
            })
        }
  }

  downloadzip() {
    this.ds.downloadzip({accessString: localStorage.getItem('accessString'), user: this.user, projname:this.projname}).subscribe((resp)=>{
      if (resp.status=="ok"){
        var arrayBufferView = new Uint8Array(resp.data.data);
        var blob = new Blob([arrayBufferView]);
        fileSaver.saveAs(blob, resp.ran+'.zip')
      }
    })
    document.getElementById('zipbutton').style.display = 'none';
    document.getElementById('downloading').style.display = 'block';
  }

  deleteproj(){
    if (confirm('are you sure?')) {
      this.ds.deleteproject({email:this.email, accessString:localStorage.getItem('accessString'), projname:this.projname}).subscribe((re)=>{
        if (re.status=="ok"){
          alert('Project Deleted');
          setTimeout(()=>{this.router.navigate(['/profilepage'], {queryParams:{user:this.email}})}, 500)
        }
      })
    }
  }
}


