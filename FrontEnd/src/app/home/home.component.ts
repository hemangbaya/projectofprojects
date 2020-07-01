import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  pages: any;
  navtext: string;
  constructor(private ds:DataService, private route:ActivatedRoute, private router: Router) { }
  searchterm;
  content;
  page;
  @ViewChild('a') imga;
  @ViewChild('b') imgb;
  @ViewChild('c') imgc;
  @ViewChild('d') imgd;
  @ViewChild('e') imge;
  @ViewChild('z') imgz;
  @ViewChild('g') imgg;
  @ViewChild('h') imgh;
  projs:Array<any>;
  ngOnInit(): void {
    var fillerdiv=8;
    this.content='';
    document.getElementById('projs').innerHTML='';
    this.route.queryParams.subscribe((par)=>{
      // alert(par.user);
      if (par.page==undefined || par.searchterm==undefined) {
        this.page=1;
        this.searchterm='';
      }
      else{
        this.page=par.page;
        this.searchterm=par.searchterm;
      }
      // alert(this.searchterm)
      this.ds.getprojects({searchterm:this.searchterm, page:this.page, search:'true'}).subscribe((data)=>{
        if (data.status=="ok") {
          this.projs=data.data;
          this.content+=`<div style="display: flex;
          justify-content: space-evenly;
          align-content: space-around;
          width: 80%;
          margin: 0 auto;
          flex-wrap: wrap;">`;
                for (var i=0;i<this.projs.length;i++) {
                  this.content+=`
                  <a href="/projectpage?user=${this.projs[i].email}&projname=${this.projs[i].projname}" style="text-decoration:none;">`
                  this.content+=`
                  <div style="text-align:center; height:250px;width:250px; border-radius: 25px;margin-top: 15px;" >
                  
                  <div style= "transition:0.1s;font-size:15px;padding:20px;overflow: hidden;height:160px;color:white; width:210px;border-top-left-radius:25px; 
                  border-top-right-radius:25px;
                   position:relative;word-wrap: break-word;text-align:center;opacity:0;" 
                  onMouseOver="this.style.backgroundColor='#000000'; this.style.opacity=0.8;" onMouseLeave="this.style.opacity=0">
                 
                  ${this.projs[i].projdescription}</div>
                  <div style="font-size:20px;border-bottom-left-radius:25px;border-bottom-right-radius:25px;color:white;padding:5px;overflow: hidden; background-color:#000000; opacity:0.9; height:40px;">
                  <div>${this.projs[i].projname.slice(0,23)+'...'}</div>
                  <div style="font-size:15px; color:red;">${this.projs[i].likes} <span style="color:white;">likes</span></div>
                  </div>
                  
                  </div>
                  </a>
                  `
                }
               
              
              if (this.projs[0]!=undefined){
                this.ds.getimage({email:this.projs[0].email, projname: this.projs[0].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imga.nativeElement.src=imageUrl;
                    // this.imga.nativeElement.height="1px"
                    // this.fillerdiv-=1;
                });
                fillerdiv--;
              }
              
              if (this.projs[1]!=undefined){
                this.ds.getimage({email:this.projs[1].email, projname: this.projs[1].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgb.nativeElement.src=imageUrl;
                    // this.fillerdiv-=1;
                });
                fillerdiv--;
              }
              
              if (this.projs[2]!=undefined){
                this.ds.getimage({email:this.projs[2].email, projname: this.projs[2].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgc.nativeElement.src=imageUrl;
                    // this.fillerdiv-=1;
                });
                fillerdiv--;
              }
              
              if (this.projs[3]!=undefined){
                this.ds.getimage({email:this.projs[3].email, projname: this.projs[3].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgd.nativeElement.src=imageUrl;
                    // this.fillerdiv-=1;
                });
                fillerdiv--;
              }
              
              if (this.projs[4]!=undefined){
                this.ds.getimage({email:this.projs[4].email, projname: this.projs[4].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imge.nativeElement.src=imageUrl;
                    // this.fillerdiv-=1;
                });
                fillerdiv--;
              }
              
              if (this.projs[5]!=undefined){
                // alert(this.projs[5].email)
                // alert(this.projs[5].projname)
                this.ds.getimage({email:this.projs[5].email, projname: this.projs[5].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgz.nativeElement.src=imageUrl;
                    // this.fillerdiv-=1;
                    // alert(this.imgz)
                });
                fillerdiv--;
              }
              
              if (this.projs[6]!=undefined){
                this.ds.getimage({email:this.projs[6].email, projname: this.projs[6].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgg.nativeElement.src=imageUrl;
                });
                fillerdiv--;
              }
              
              if (this.projs[7]!=undefined){
                this.ds.getimage({email:this.projs[7].email, projname: this.projs[7].projname, no:1}).subscribe((dat)=>{
                  
                  var arrayBufferView = new Uint8Array( dat.data.data);
                  var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                  // fileSaver.saveAs(blob, 'a.jpg')
                  var urlCreator = window.URL || window.webkitURL;
                  var imageUrl = urlCreator.createObjectURL( blob );
                  // alert(imageUrl)
                  // this.content+=`<img src="${imageUrl}" alt="no image>`;
                    this.imgh.nativeElement.src=imageUrl;
                });
                fillerdiv--;
              }
              for(var w=0; w<fillerdiv;w++) {
                // alert(1)
                this.content+=`<div style="height:250px;width:250px; border-radius: 25px;margin-top: 15px; ">
                </div>`
              } 
              this.content+='</div>';
              document.getElementById('projs').innerHTML=this.content;
              var start=0;
              var end=0;
              this.pages = data.pages;
              // alert(this.pages)
              this.navtext='';

              start= Math.floor(this.page)-2;
              end = Math.floor(this.page)+2;
              while(start<1) {
                end++;
                start++;
              }
              // alert(par.page)
              while(end>this.pages){
                end--;
              }
              if (start!=1) {
                this.navtext+=`
                    <div style="margin-bottom: 10px;width:35px; height:35px; border-radius:50px; color:black;">....</div>
                  `
              }
              for (var q=start; q<=end; q++) {
                if (q==this.page) {
                  this.navtext+=`<a href="/?searchterm=${this.searchterm}&page=${q}">
                  <div style="margin-bottom: 10px;height:17px;padding:7px; border-radius:3px; background-color:white;color:black;border:1px solid black">${q}</div>
                </a>`
                }
                else {
                  this.navtext+=`<a href="/?searchterm=${this.searchterm}&page=${q}">
                    <div style="margin-bottom: 10px;height:17px;padding:7px;border-radius:3px; background-color:#bdbdbd;color:white;">${q}</div>
                  </a>`
                }
              }
              if (end!=this.pages){
                this.navtext+=`
                    <div style="margin-bottom: 10px;width:35px; height:35px; border-radius:50px;color:black;">....</div>
                  `
              }
              
              document.getElementById('pages').innerHTML=this.navtext;
        }
        else {
            this.content+=`no projects here.`;
            document.getElementById('projs').innerHTML=this.content;
        }
        
      })
    })
  }
  
  search() {
    
    // this.router.navigate(['/'], {queryParams:{searchterm:this.searchterm, page:this.page}})
    window.location.href=`?searchterm=${this.searchterm}&page=${this.page}`;
  }
}
