import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  encrypt(word, key = 'share') {
    let encJson = CryptoJS.AES.encrypt(JSON.stringify(word), key).toString()
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
    return encData
  } 


  email: string = "";
  password: string = "";
  register(){
        this.http.post('http://localhost:3001/api/register', {
          email: this.email,
          password: this.password
        }).subscribe((data: any) => {
          if (data != 'error'){
            localStorage.setItem('id', this.encrypt(data));
          window.location.href = '/profile';
          }
        }
        );
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
