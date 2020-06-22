import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadpage',
  templateUrl: './uploadpage.component.html',
  styleUrls: ['./uploadpage.component.css']
})
export class UploadpageComponent implements OnInit {

  constructor(private ds:DataService, private router:Router) { }
  ngOnInit(): void {
    this.ds.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
      if (response.status != "ok") {
        this.router.navigate(['/signin'], { queryParams: { message: 'signinfirst'}});
      }
    });
    
  }

}
