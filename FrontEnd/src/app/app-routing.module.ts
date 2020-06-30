import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { MainComponent } from './main/main.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { ProjectpageComponent } from './projectpage/projectpage.component';
import { UploadpageComponent } from './uploadpage/uploadpage.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';


const routes: Routes = [
  {path:'signup', component:SignupComponent},
  {path: '', component: MainComponent},
  {path: 'signin', component:SigninComponent},
  {path: 'profilepage', component:ProfilepageComponent},
  {path:'projectpage', component:ProjectpageComponent},
  {path: 'uploadpage', component:UploadpageComponent},
  {path: 'changepassword', component:ChangepasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
