import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomComponent } from './custom/custom.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MylinksComponent } from './mylinks/mylinks.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'mylinks', component: MylinksComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'custom', component: CustomComponent},


  // path 404
 { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
