import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NavbarofflineComponent } from './navbaroffline/navbaroffline.component';
import { NavbaronlineComponent } from './navbaronline/navbaronline.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MylinksComponent } from './mylinks/mylinks.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxStripeModule } from 'ngx-stripe';
import { StripeService } from 'ngx-stripe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarofflineComponent,
    NavbaronlineComponent,
    PagenotfoundComponent,
    LoginComponent,
    RegisterComponent,
    MylinksComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxStripeModule,
    NgxStripeModule.forRoot('pk_test_51Lz0zUH90mkV8RbSTJSExllESbs3MoG2mhOR9fw9tQKYBwbcjUF24OsCA19pfV7onnoVnYPkfhxrEuSTXMo4zhLc00LNVmQgVK'),
  ],
  providers: [
    HttpClient,
    StripeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
