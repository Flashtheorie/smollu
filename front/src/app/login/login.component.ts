import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email: string = "";
password: string = "";
loader: boolean = false;
error: string = "";
encrypt(word, key = 'share') {
  let encJson = CryptoJS.AES.encrypt(JSON.stringify(word), key).toString()
  let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
  return encData
} 

decrypt(word, key = 'share') {
  let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
  let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8)
  return JSON.parse(bytes)
}


login(){
      this.loader = true;

      this.http.post('http://localhost:3001/api/login', {
        email: this.email,
        password: this.password
      }).subscribe((data: any) => {
        // if the json received isnt "error" then it means the login was successful
        if (data != "error") {
        
          localStorage.setItem('id', this.encrypt(data));
          window.location.href = '/';
          console.log(data);
        }
        else {
          this.error = "Incorrect email or password 🧙🏼";
        };
        this.loader = false;
      }
      );

}
  constructor(private http : HttpClient) { 
    
   }

  ngOnInit(): void {
  }

}
