import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {
  projname;
  projdescription;
  projhowtosetup;
  projuploader:Array<File>;
  projtags;
  email;
  zip;
  name;
  constructor(private ds:DataService, private router:Router) { }
  ngOnInit(): void {
    this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
      if (response.status != "ok") {
        this.router.navigate(['/signin'], { queryParams: { message: 'signinfirst'}});
      }
      else {
        this.email = response.data.email;
        this.name = response.data.name;
      }
    });
  }

  getimages(eve) {
    this.projuploader=eve.target.files;
  }
  getzip(eve) {
    this.zip=eve.target.files[0];
  }
  sendprojdetails() {
    var desc = document.getElementById('projectdescription') as any;
    var hts = document.getElementById('projecthowtosetup') as any;
    var tgs = document.getElementById('projecttags') as any;
    this.projdescription = desc.value;
    this.projhowtosetup = hts.value;
    this.projtags = tgs.value;

    document.getElementById('projnamesug').innerHTML = '';
    document.getElementById('projdescriptionsug').innerHTML = '';
    document.getElementById('projhowtosetupsug').innerHTML = '';
    document.getElementById('projtagssug').innerHTML = '';
    document.getElementById('projuploadersug').innerHTML = '';
    document.getElementById('projzipsug').innerHTML=''

    

    var formstat = 1;
    if (this.projname=="" || this.projname==null || /\s/.test(this.projname)) {
      document.getElementById("projnamesug").innerHTML = 'Enter valid project name';
      formstat=0;
    }
    if (this.projdescription=="" || this.projdescription==null) {
      document.getElementById("projdescriptionsug").innerHTML = 'Enter Description';
      formstat=0;
    }
    if (this.projhowtosetup=="" || this.projhowtosetup==null) {
      document.getElementById("projhowtosetupsug").innerHTML = 'Enter details on how to setup'
      formstat=0;
    }
    if (this.projtags=="" || this.projtags==null) {
      document.getElementById("projtagssug").innerHTML = 'Enter tags'
      formstat=0;
    }
    if (this.projuploader == undefined) {
      document.getElementById('projuploadersug').innerHTML = 'Select Min 1 image and max 5 images';
      formstat=0;
    }
    else {
      if (this.projuploader.length<1 || this.projuploader.length>5) {
        document.getElementById('projuploadersug').innerHTML = 'Select Min 1 image and max 5 images';
        formstat=0;
      }
    }
    if (this.zip==undefined || this.zip.length==0) {
      document.getElementById("projzipsug").innerHTML="Select one zip file containing project files";
      // alert(1)
      formstat=0;
    }
    document.getElementById("projectexists").style.display = "none";
    if (formstat == 1) {
      // this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
      //   if (response.status == "ok") {
        
          var uploadhelper = new FormData();
          uploadhelper.set("email", this.email);
          uploadhelper.set("projname", this.projname.toLowerCase());
          uploadhelper.set("projdescription", this.projdescription);
          uploadhelper.set("projhowtosetup", this.projhowtosetup);
          uploadhelper.set("projtags", this.projtags);
          uploadhelper.set("imgcnt", String(this.projuploader.length));
          uploadhelper.set("name", this.name); 
          for (var i=0; i<this.projuploader.length;i++) {
            uploadhelper.append("proj",this.projuploader[i], this.projuploader[i]['name']);
          }
          uploadhelper.set("zip", this.zip);
          
      //     alert("asdf");
      //     this.ds.addproject( uploadhelper).subscribe((data)=>{alert(JSON.stringify(data))});
          this.ds.projectexistchecker({email:this.email, projname:this.projname}).subscribe((data)=>{
            if (data.status=="ok") {
              this.ds.addproject( uploadhelper).subscribe((data)=>{  });
              setTimeout(()=>{
                this.router.navigate(['/profilepage'], { queryParams: {user: this.email}});
              }, 200)
            }
            else {
              document.getElementById("projectexists").style.display = "block";
            }
          });
      //   }
      //   else {
      //     this.router.navigate(['/signin'], { queryParams: { message: 'signinfirst'}});
      //   }
      // });
    }
  }
}

// projname;
//   projdescription;
//   projgithublink;
//   projhowtosetup;
//   projuploader:Array<File>;
//   projtags;
         // var projectdetails = new FormData();
          // for (var i=0; i<this.projuploader.length; i++) {
          //   projectdetails.append('projectimage', this.projuploader[i], this.projuploader[i]['name']);
          // }
          // this.ds.addproject(projectdetails).subscribe((data)=>{
          //   alert(JSON.stringify(data));
          // })
    //       var form = new FormData();
    // for (var i=0; i<this.projuploader.length;i++)
    // {
    //   form.append("projectuploader",this.projuploader[i], this.projuploader[i]['name']);
    // }
    
    // this.ds.addproject(form).subscribe((data)=>{alert(JSON.stringify(data))});


    // var details = new FormData();
    // var nooffiles;
    // var formstat =1;
    // 
    // this.projdescription = document.getElementById('projectdescription').value;

    // if (this.projname=="" || this.projname==null) {
    //   document.getElementById("projnamesug").innerHTML = 'Enter project name';
    //   formstat=0;
    // }
    // if (this.projdescription=="" || this.projdescription==null) {
    //   document.getElementById("projdescriptionsug").innerHTML = 'Enter Description';
    //   formstat=0;
    // }
    // if (this.projgithublink=="" || this.projgithublink==null) {
    //   document.getElementById("projgithublinksug").innerHTML = 'Enter link to project on GitHub';
    //   formstat=0;
    // }
    // if (this.projhowtosetup=="" || this.projhowtosetup==null) {
    //   document.getElementById("projhowtosetupsug").innerHTML = 'Enter details on how to setup'
    //   formstat=0;
    // }
    // if (this.projtags=="" || this.projtags==null) {
    //   document.getElementById("projtagssug").innerHTML = 'Enter details on how to setup'
    //   formstat=0;
    // }
    // for(var i=0; i<this.projuploader.length; i++) {

    // }


// getProfile(e)
// {
//     this.profile=e.target.files[0];
// }
// getGallery(e)
// {
//   this.gallery=e.target.files;
// }
// postData()
// {
//   var form = new FormData();
//   for (var i=0; i<this.gallery.length;i++)
//   {
//     form.append("gallery",this.gallery[i], this.gallery[i]['name']);
//   }
//   form.set('name', name);
//   form.set('profile', this.profile);
  
//   this.ds.postDataWithImage(form).subscribe((d)=>{alert(JSON.stringify(d))});
// }