import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  constructor(private route:ActivatedRoute, private ds:DataService) { }
  name;
  projs:Array<any>;
  myemail;
  email;
  projname
  content;
  imgarray:Array<any>;
  icnt;
  page;
  pages;
  navtext;
  @ViewChild('a') imga;
  @ViewChild('b') imgb;
  @ViewChild('c') imgc;
  @ViewChild('d') imgd;
  @ViewChild('e') imge;
  @ViewChild('f') imgf;
  @ViewChild('g') imgg;
  @ViewChild('h') imgh;
  ngOnInit(): void {
    this.content="";
    this.navtext="";
    this.route.queryParams.subscribe((par)=>{
      // alert(par.user);
      if (par.page==undefined) {
        this.page=1;
      }
      else{
        this.page=par.page;
      }
      // alert(this.page)
      this.ds.getprojects({email:par.user, page:this.page, search:'false'}).subscribe((data)=>{
        if (data.status=="ok") {
          this.projs=data.data;
          this.name = this.projs[0].name;
          this.content+=`<img src="https://robohash.org/${this.name}">`;
              this.content+=`<div>${this.projs[0].email}</div>`;
            this.imgarray=[];
            this.icnt=this.projs.length-1;
                for (var i=0;i<this.projs.length;i++) {
                  this.content+=`<a href="/projectpage?user=${this.projs[i].email}&projname=${this.projs[i].projname}">`

                  this.content+=`
                  <div>${this.projs[i].projname}</div>
                  <div>${this.projs[i].projdescription}</div>
                  <div>${this.projs[i].likes}</div>
                  </a>
                  `
                  
                  
                }
               
              document.getElementById('projsgohere').innerHTML=this.content;
              if (this.projs[0]!=undefined){
                this.ds.getimage({email:par.user, projname: this.projs[0].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imga.nativeElement.src=imageUrl;
                    
                });
              }
              if (this.projs[1]!=undefined){
                this.ds.getimage({email:par.user, projname: this.projs[1].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgb.nativeElement.src=imageUrl;
                    
                });
              }
              if (this.projs[2]!=undefined){
                this.ds.getimage({email:par.user, projname: this.projs[2].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgc.nativeElement.src=imageUrl;
                    
                });
              }
              if (this.projs[3]!=undefined){
                this.ds.getimage({email:par.user, projname: this.projs[3].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgd.nativeElement.src=imageUrl;
                    
                });
              }
              if (this.projs[4]!=undefined){
                this.ds.getimage({email:par.user, projname: this.projs[4].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imge.nativeElement.src=imageUrl;
                    
                });
              }
              if (this.projs[5]!=undefined){
                this.ds.getimage({email:par.user, projname: this.projs[5].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgf.nativeElement.src=imageUrl;
                    
                });
              }
              if (this.projs[6]!=undefined){
                this.ds.getimage({email:par.user, projname: this.projs[6].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgg.nativeElement.src=imageUrl;
                    
                });
              }
              if (this.projs[7]!=undefined){
                this.ds.getimage({email:par.user, projname: this.projs[7].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgh.nativeElement.src=imageUrl;
                    
                });
              }
              
              this.pages = data.pages;
              this.navtext='';
              for (var q=0; q<this.pages; q++) {
                this.navtext+=`<a href="profilepage?user=${par.user}&page=${q+1}">${q+1}</a>`
              }
              document.getElementById('pages').innerHTML=this.navtext;
              // alert(this.navtext)
        }
        else {
            this.content+=`<div style="margin:0px auto;"><a href="/profilepage?user=${par.user}">${par.user}</a> has no projects</div>`;
            document.getElementById('projsgohere').innerHTML=this.content;
        }
        

        this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((r)=> {
          this.myemail=r.data.email;
          if (this.myemail==par.user) {
            document.getElementById('changepassword').style.display='block';
          }
      });
      })
    })
    
  }
  changepassword(){
    this.ds.changepassword({email:this.myemail, accessString:localStorage.getItem('accessString')}).subscribe((response)=>{
      document.getElementById('emailsent').style.display='block';
      document.getElementById('changepassword').style.display='none';
    })
  }
  
  setcontent() {
    document.getElementById('projsgohere').innerHTML=this.content;
  }
}

          // if (i==2) {
          //   this.imgb.nativeElement.src=imageUrl;
          // }
          // if (i==3) {
          //   this.imgc.nativeElement.src=imageUrl;
          // }
          // if (i==4) {
          //   this.imgd.nativeElement.src=imageUrl;
          // }
          // if (i==5) {
          //   this.imge.nativeElement.src=imageUrl;
          // }
          // if (i==6) {
          //   this.imgf.nativeElement.src=imageUrl;
          // }
          // if (i==7) {
          //   this.imgg.nativeElement.src=imageUrl;
          // }
          // if (i==8) {
          //   this.imgh.nativeElement.src=imageUrl;
          // }