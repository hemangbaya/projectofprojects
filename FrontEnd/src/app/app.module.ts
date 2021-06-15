import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SignupComponent } from './signup/signup.component';

import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { MainComponent } from './main/main.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { ProjectpageComponent } from './projectpage/projectpage.component';
import { UploadpageComponent } from './uploadpage/uploadpage.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SignupComponent,
    HomeComponent,
    SigninComponent,
    MainComponent,
    ProfilepageComponent,
    ProjectpageComponent,
    UploadpageComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
