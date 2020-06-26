import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  signUp(data):any {
    return this.http.post(this.baseURL + "/sign-up", data);
  }

  signIn(data):any {
    return this.http.post(this.baseURL + "/sign-in", data);
  }
  
  check(data):any {
    return this.http.post(this.baseURL + "/login-check", data);
  }

  helpcheck():any {
    if (localStorage.removeItem("accessString") != undefined) {
      this.check({accessString: localStorage.getItem('accessString')}).subscribe((response)=> {
        if (response.status == "ok") {
          return response;
        }
        else {
          return "accesschanged";
        }
      });
    }
    else {
      return false;
    }
  }

  addproject(data):any {
    return this.http.post(this.baseURL + "/add-project", data);
  }
  // addimages(data):any {
  //   return this.http.post(this.baseURL + "/add-images", data);
  // }

  projectexistchecker(data):any {
    return this.http.post(this.baseURL + '/project-exist-checker', data);
  }

  getproject(data):any {
    return this.http.post(this.baseURL+'/get-project', data);
  }
  ifliked(data):any {
    return this.http.post(this.baseURL + '/if-liked', data);
  }
  likeproj(data):any {
    return this.http.post(this.baseURL+'/like-proj', data)
  }
}
