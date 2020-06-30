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
                for (var i=0;i<this.projs.length;i++) {
                  this.content+=`<a href="/projectpage?user=${this.projs[i].email}&projname=${this.projs[i].projname}">`

                  this.content+=`
                  <div>${this.projs[i].projname}</div>
                  <div>${this.projs[i].projdescription}</div>
                  <div>${this.projs[i].likes}</div>
                  </a>
                  `
                }
               
              document.getElementById('projs').innerHTML=this.content;
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
                    
                });
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
                    
                });
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
                    
                });
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
                    
                });
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
                    
                });
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
                    // alert(this.imgz)
                    
                });
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
              }
              
              this.pages = data.pages;
              // alert(this.pages)
              this.navtext='';
              for (var q=0; q<this.pages; q++) {
                this.navtext+=`<a href="/?searchterm=${this.searchterm}&page=${q+1}">${q+1}</a>`
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
